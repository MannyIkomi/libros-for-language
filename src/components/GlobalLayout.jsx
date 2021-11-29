/** @jsx jsx */
import React, { cont } from 'react';

import { Global, jsx } from '@emotion/react';
import HtmlHead from './HtmlHead';
import {
  SANS_FONT,
  headings,
  BLACK,
  WHITE,
  a,
  p,
  notoSans,
  colors,
  s1,
  onTabletMedia,
  onDesktopMedia,
  headingsDesktop,
} from '../styles';
import 'normalize.css/normalize.css';
import { graphql, useStaticQuery } from 'gatsby';
import { slugify } from '../utils/slugify';

export function useGlobalQuery() {
  const query = useStaticQuery(graphql`
    query GlobalQuery {
      categories: __type(name: "GraphCMS_CategoryType") {
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
  console.log(globalData);

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
              categories: globalData.categories.enumValues.map(
                (enumerator) => ({
                  title: enumerator.name.replace('_', ' '),
                  slug: `/browse/${slugify(enumerator.name)}s`,
                  _name: enumerator.name,
                })
              ),
              about: {
                title: 'About',
                slug: slugify('About'),
              },
              resources: {
                title: 'Resources',
                slug: slugify('Resources'),
              },
            },
          }}
        >
          {children}
        </GlobalContext.Provider>
      </div>
    </>
  );
};
