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
    query CreatePages {
      allGraphCmsBook {
        nodes {
          bookTitle
          slug
        }
      }
      tagTypes: __type(name: "GraphCMS_TagType") {
        enumValues {
          name
        }
      }
      allGraphCmsTag(sort: { fields: title, order: ASC }) {
        nodes {
          title
          slug
          tagType
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

  result.data.tagTypes.enumValues.forEach((typeEnum) => {
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

  result.data.allGraphCmsTag.nodes.forEach((tag) => {
    const typeSlug = slugify(tag.tagType);
    // const viewName = type.name.replace('_', '-');
    createPage({
      path: `/browse/${typeSlug}s/${tag.slug}`,
      component: TagTemplate,
      context: {
        title: tag.title,
        slug: tag.slug,
        type: tag.tagType,
      },
    });
  });
};
