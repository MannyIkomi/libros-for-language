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
  p,
  notoSans,
  s1,
  onTabletMedia,
  headingsDesktop,
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
    }
  `);
  return query;
}
export const GlobalContext = React.createContext();
GlobalContext.displayName = 'Global Context';

export const GlobalLayout = ({ htmlHead, children }) => {
  const globalData = useGlobalQuery();

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
              //   color: BLACK,
              //   fontFamily: SANS_FONT,
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
            ...headings,
            a,
            p,
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
                title: 'All Books',
                path: `/${slugify('books')}`,
              },
              allTags: {
                title: 'All Tags',
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

              tags: globalData.tags.enumValues.map((term) => {
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
          }}
        >
          {children}
        </GlobalContext.Provider>
      </div>
    </>
  );
};
