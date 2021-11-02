const path = require(`path`);
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const BookTemplate = path.resolve(`src/templates/Book.jsx`);
  const result = await graphql(`
    query {
      allGraphCmsBook {
        nodes {
          bookTitle
          slug
        }
      }
    }
  `);
  result.data.allGraphCmsBook.nodes.forEach((book) => {
    createPage({
      path: `/books/${book.slug}`,
      component: BookTemplate,
      context: {
        title: book.title,
        slug: book.slug,
      },
    });
  });
};
