/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { flex, s1, PRIMARY20, PRIMARY } from '../styles';
import { slugify } from '../utils/slugify';

export function Footer() {
  const thisYear = new Date().getFullYear();
  const data = useStaticQuery(graphql`
    query FooterQuery {
      categoryTypes: __type(name: "GraphCMS_CategoryType") {
        enumValues {
          name
        }
      }
      allGraphCmsGrade: allGraphCmsCategory(
        filter: { categoryType: { eq: Grade } }
      ) {
        nodes {
          title
          slug
          categoryType
        }
      }
      allGraphCmsGenre: allGraphCmsCategory(
        filter: { categoryType: { eq: Genre } }
      ) {
        nodes {
          title
          slug
          categoryType
        }
      }
      allGraphCmsLanguage: allGraphCmsCategory(
        filter: { categoryType: { eq: Language } }
      ) {
        nodes {
          title
          slug
          categoryType
        }
      }
      allGraphCmsText_Structure: allGraphCmsCategory(
        filter: { categoryType: { eq: Text_Structure } }
      ) {
        nodes {
          title
          slug
          categoryType
        }
      }
    }
  `);

  return (
    <footer
      css={{
        padding: s1,
        textAlign: 'left',
        backgroundColor: PRIMARY,
      }}
    >
      <div css={[flex()]}>
        {/* <img src="/logo" alt="logo" /> */}
        <ul>
          {data.categoryTypes.enumValues.map((type) => {
            const viewName = type.name.replace('_', ' ');

            return (
              <li key={type.name}>
                <a href={`/${slugify(viewName)}`}>{viewName}</a>
              </li>
            );
          })}
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
        <p css={{ color: PRIMARY20, fontSize: '0.75rem' }}>
          <a href="https://www.ala.org/">
            <small css={{ color: 'inherit' }}>
              Funded by the American Library Association
            </small>
          </a>{' '}
          <br />
          <small css={{ color: 'inherit' }}>
            Copyright © {thisYear} Libros for Language. All rights reserved.
          </small>
        </p>
      </div>
    </footer>
  );
}
