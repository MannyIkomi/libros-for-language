require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const { log } = require('console');
const path = require(`path`);
const pluralize = require('pluralize');

const isDevEnv = process.env.NODE_ENV === 'development';
const isGatsbyPreview = process.env.GATSBY_CLOUD === 'preview';

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
  const TagCategoryTemplate = path.resolve(
    `src/templates/TagCategoryTemplate.jsx`
  );

  const result = await graphql(`
    query CreatePages {
      allGraphCmsBook {
        nodes {
          title
          slug
          publisherSummary
          bookCover {
            url
          }
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

  result.data.allGraphCmsBook.nodes
    .filter((book) => {
      if (!book.bookCover) {
        console.warn(
          `${book.title} does not have a cover image, it will not be rendered.`
        );
      }
      return book.bookCover;
    })
    .filter((book) => {
      if (!book.publisherSummary) {
        console.warn(
          `${book.title} does not have a publisher summary, it will not be rendered.`
        );
      }
      return book.publisherSummary;
    })
    .forEach((book) => {
      if (book.tags.length === 0) {
        console.warn(`${book.title} does not have any tags.`);
      }
      createPage({
        path: `/books/${book.slug}`,
        component: BookTemplate,
        context: {
          ...book,
        },
      });
      return;

      // books without tags get dropped unless the environment is development
    });

  result.data.allGraphCmsContributor.nodes.forEach((contributor) => {
    const { firstName, lastName, booksAuthored, booksIllustrated, slug } =
      contributor;
    const name = `${firstName} ${lastName}`;

    if (isDevEnv || isGatsbyPreview) {
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

    if (
      (slug && booksAuthored.length > 0) ||
      (slug && booksIllustrated.length > 0)
    ) {
      createPage({
        path: `/authors-illustrators/${slug}`,
        component: ContributorTemplate,
        context: {
          name,
          ...contributor,
        },
      });
      console.warn(
        name,
        'Does not have any books assigned and will not be rendered on the site.'
      );
      return;
    }
  });

  result.data.tagTypes.enumValues.forEach((typeEnum) => {
    const typeSlug = slugify(pluralize.plural(typeEnum.name));
    // const viewName = type.name.replace('_', '-');
    createPage({
      path: `/tags/${typeSlug}`,
      component: TagCategoryTemplate,
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
