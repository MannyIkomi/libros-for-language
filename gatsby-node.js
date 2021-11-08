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
  const BookTemplate = path.resolve(`src/templates/Book.jsx`);
  const TagTemplate = path.resolve(`src/templates/Tag.jsx`);
  const CategoryTemplate = path.resolve(`src/templates/Category.jsx`);
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
        title: book.bookTitle,
        slug: book.slug,
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
