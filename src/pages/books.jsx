/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as React from 'react';
import { graphql } from 'gatsby';
import ReactTags from 'react-tag-autocomplete';
import { SearchFilter } from '../components/SearchFilter';

import {
  s1,
  onTabletMedia,
  flex,
  BLACK,
  grid12Columns,
  onDesktopMedia,
  s2,
  PRIMARY20,
  COMPLIMENT20,
} from '../styles';
import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { DebugData } from '../components/DebugData';

import { GlobalLayout } from '../components/GlobalLayout';

import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';

function BooksPage({ data }) {
  const tagTypes = data.tagTypes.nodes;
  const tags = data.allGraphCmsTag.nodes;
  const books = data.allGraphCmsBook.nodes;

  return (
    <>
      <GlobalLayout>
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section>
            <Container>
              <Heading level={1}>Books</Heading>
              <SearchFilter></SearchFilter>
            </Container>
          </Section>
          <Section>
            <DebugData>{books}</DebugData>
          </Section>
        </main>
        <Footer />
      </GlobalLayout>
    </>
  );
}

export const query = graphql`
  query BooksPageQuery {
    tagTypes: __type(name: "GraphCMS_TagType") {
      enumValues {
        name
      }
    }

    allGraphCmsTag {
      nodes {
        tagType
        slug
        title
      }
    }

    allGraphCmsBook {
      nodes {
        bookTitle
        slug
        tags {
          title
          slug
        }
      }
    }
  }
`;

export default BooksPage;
