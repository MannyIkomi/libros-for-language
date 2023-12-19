/** @jsx jsx */
import React from 'react';
import * as pluralize from 'pluralize';
import { Global, jsx } from '@emotion/react';
import HtmlHead from './HtmlHead';
import {
  headings,
  BLACK,
  WHITE,
  a,
  b,
  strong,
  p,
  label,
  textarea,
  input,
  notoSans,
  form,
  s1,
  onTabletMedia,
  headingsDesktop,
  COMPLIMENT,
  COMPLIMENT60,
} from '../styles';
import 'normalize.css/normalize.css';
import { graphql, useStaticQuery } from 'gatsby';
import { slugify } from '../utils/slugify';

export function useGlobalQuery() {
  const query = useStaticQuery(graphql`
    query GlobalQuery {
      tags: __type(name: "GraphCMS_TagType") {
        enumValues {
          name
        }
      }
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
    }
  `);
  return query;
}

export const GlobalContext = React.createContext();
GlobalContext.displayName = 'Global Context';

// export const GlobalProvider = ({ children }) => {
//   const dataQuery = useGlobalQuery();
//   // Define your static data here
//   const staticData = {
//     // Your static data properties
//     message: 'Hello, Global Context!',
//     // Add more properties as needed
//   };

//   return (
//     <GlobalContext.Provider value={dataQuery}>
//       {children}
//     </GlobalContext.Provider>
//   );
// };

export const GlobalLayout = ({ htmlHead, children }) => {
  const { tags, allGraphCmsBook } = useGlobalQuery();

  return (
    <>
      <HtmlHead {...htmlHead} />
      <Global
        styles={[
          {
            '*': {
              boxSizing: 'border-box',
              margin: 0,
              padding: 0,
            },
            body: {
              ...notoSans,
              backgroundColor: WHITE,
              color: BLACK,
              fontSize: s1,
              lineHeight: '1.2',
            },
            svg: {
              fill: 'currentcolor',
            },
            hr: {
              borderStyle: 'none',
            },
            ...headings,

            a,
            p,
            strong,
            b,
            label,
            textarea,
            input,
            form,
          },
          onTabletMedia({
            ...headingsDesktop,
          }),
        ]}
      />

      <div
        css={{
          backgroundColor: WHITE,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <GlobalContext.Provider
          value={{
            navigation: {
              books: {
                title: 'Browse Books',
                path: `/${slugify('books')}`,
              },
              allTags: {
                title: 'Browse Tags',
                path: `/${slugify('tags')}`,
              },
              typology: {
                title: 'Our Typology',
                path: `/${slugify('typology')}`,
              },

              authorIllustrator: {
                title: 'Authors & Illustrators',
                path: `/${slugify('authors-illustrators')}`,
              },
              about: {
                title: 'About',
                path: `/${slugify('About')}`,
              },
              resources: {
                title: 'Resources',
                path: `/${slugify('Resources')}`,
              },
              contact: {
                title: 'Contact Us',
                path: `/${slugify('Contact')}`,
              },

              tags: tags.enumValues.map((term) => {
                const base = {
                  title: `by ${term.name.replace('_', ' ')}`,
                  path: `/tags/${slugify(pluralize.plural(term.name))}`,
                  _name: term.name,
                };

                switch (term.name) {
                  case 'Grade':
                    return {
                      ...base,
                      group: 'outterTag',
                    };
                  case 'Genre':
                    return {
                      ...base,
                      group: 'outterTag',
                    };
                  case 'Language':
                    return {
                      ...base,
                      group: 'outterTag',
                    };

                  default:
                    return {
                      ...base,
                      group: 'innerTag',
                    };
                }
              }),
            },
            allGraphCmsBook,
          }}
        >
          {children}
        </GlobalContext.Provider>
      </div>
    </>
  );
};
