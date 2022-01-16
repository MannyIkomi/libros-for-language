const path = require(`path`);
const pluralize = require('pluralize');

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
  const ContributorTemplate = path.resolve(
    `src/templates/ContributorTemplate.jsx`
  );
  const TagTemplate = path.resolve(`src/templates/TagTemplate.jsx`);
  const TagListingTemplate = path.resolve(
    `src/templates/TagListingTemplate.jsx`
  );

  const result = await graphql(`
    query CreatePages {
      allGraphCmsBook {
        nodes {
          title
          slug
          tags {
            title
          }
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
      allGraphCmsContributor {
        nodes {
          id
          firstName
          lastName
          slug
          booksAuthored {
            id
          }
          booksIllustrated {
            id
          }
        }
      }
    }
  `);

  result.data.allGraphCmsBook.nodes.forEach((book) => {
    if (book.tags.length > 0) {
      createPage({
        path: `/books/${book.slug}`,
        component: BookTemplate,
        context: {
          ...book,
        },
      });

      return;
    }

    console.warn(
      book.title,
      'Does not have any tags assigned and will not be rendered on the site.'
    );
  });

  result.data.allGraphCmsContributor.nodes.forEach((contributor) => {
    const { firstName, lastName, booksAuthored, booksIllustrated, slug } =
      contributor;

    const name = `${firstName} ${lastName}`;

    if (slug) {
      createPage({
        path: `/authors-illustrators/${slug}`,
        component: ContributorTemplate,
        context: {
          name,
          ...contributor,
        },
      });
      return;
    }

    console.warn(
      name,
      'Does not have any books assigned and will not be rendered on the site.'
    );
  });

  result.data.tagTypes.enumValues.forEach((typeEnum) => {
    const typeSlug = slugify(pluralize.plural(typeEnum.name));
    // const viewName = type.name.replace('_', '-');
    createPage({
      path: `/tags/${typeSlug}`,
      component: TagListingTemplate,
      context: {
        title: typeEnum.name.replace('_', ' '),
        slug: typeSlug,
        type: typeEnum.name,
      },
    });
  });

  result.data.allGraphCmsTag.nodes.forEach((tag) => {
    const typeSlug = slugify(pluralize.plural(tag.tagType));
    // const viewName = type.name.replace('_', '-');
    createPage({
      path: `/tags/${typeSlug}/${tag.slug}`,
      component: TagTemplate,
      context: {
        title: tag.title,
        slug: tag.slug,
        type: tag.tagType,
      },
    });
  });
};
