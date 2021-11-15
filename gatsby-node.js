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
  const CategoryTemplate = path.resolve(`src/templates/CategoryTemplate.jsx`);

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
      allGraphCmsTopic {
        nodes {
          title
          slug
        }
      }
      allGraphCmsCategory {
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

  result.data.allGraphCmsTopic.nodes.forEach((topic) => {
    createPage({
      path: `/topics/${topic.slug}`,
      component: TagTemplate,
      context: {
        title: topic.title,
        slug: topic.slug,
      },
    });
  });

  result.data.categoryTypes.enumValues.forEach((typeEnum) => {
    const typeSlug = slugify(typeEnum.name);
    // const viewName = type.name.replace('_', '-');
    createPage({
      path: `/categories/${typeSlug}`,
      component: CategoryTemplate,
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
      path: `/categories/${typeSlug}/${category.slug}`,
      component: TagTemplate,
      context: {
        title: category.title,
        slug: category.slug,
        type: category.categoryType,
      },
    });
  });
};
