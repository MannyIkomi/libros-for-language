const path = require(`path`);

function slugify(string) {
  return string.replace('_', '-').replace(' ', '-').toLowerCase();
}
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const BookTemplate = path.resolve(`src/templates/BookTemplate.jsx`);
  const TagTemplate = path.resolve(`src/templates/TagTemplate.jsx`);
  const TagListingTemplate = path.resolve(
    `src/templates/TagListingTemplate.jsx`
  );

  const result = await graphql(`
    query {
      allGraphCmsBook {
        nodes {
          bookTitle
          slug
        }
      }
      categoryTypes: __type(name: "GraphCMS_CategoryType") {
        enumValues {
          name
        }
      }
      allGraphCmsTopic(sort: { fields: title, order: ASC }) {
        nodes {
          title
          slug
        }
      }
      allGraphCmsCategory(sort: { fields: title, order: ASC }) {
        nodes {
          title
          slug
          categoryType
        }
      }
    }
  `);

  result.data.allGraphCmsBook.nodes.forEach((book) => {
    createPage({
      path: `/books/${book.slug}`,
      component: BookTemplate,
      context: {
        ...book,
      },
    });
  });

  createPage({
    path: `/browse/topics`,
    component: TagListingTemplate,
    context: {
      title: `Topics`,
      slug: `topics`,
      type: `Topic`,
    },
  });

  result.data.allGraphCmsTopic.nodes.forEach((topic) => {
    createPage({
      path: `/browse/topics/${topic.slug}`,
      component: TagTemplate,
      context: {
        title: topic.title,
        slug: topic.slug,
        type: 'Topic',
      },
    });
  });

  result.data.categoryTypes.enumValues.forEach((typeEnum) => {
    const typeSlug = slugify(typeEnum.name);
    // const viewName = type.name.replace('_', '-');
    createPage({
      path: `/browse/${typeSlug}s`,
      component: TagListingTemplate,
      context: {
        title: typeEnum.name.replace('_', ' '),
        slug: typeSlug,
        type: typeEnum.name,
      },
    });
  });

  result.data.allGraphCmsCategory.nodes.forEach((category) => {
    const typeSlug = slugify(category.categoryType);
    // const viewName = type.name.replace('_', '-');
    createPage({
      path: `/browse/${typeSlug}s/${category.slug}`,
      component: TagTemplate,
      context: {
        title: category.title,
        slug: category.slug,
        type: category.categoryType,
      },
    });
  });
};
