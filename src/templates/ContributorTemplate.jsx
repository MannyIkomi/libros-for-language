/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';
import * as pluralize from 'pluralize';

import { DebugData } from '../components/DebugData';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import {
  grid,
  base160,
  onTabletMedia,
  s1,
  boxShadowLg,
  COMPLIMENT,
  s2,
  flex,
  colors,
  PRIMARY,
} from '../styles';
import { GlobalLayout } from '../components/GlobalLayout';
import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
import { Heading } from '../components/Heading';
import { BookCover } from '../components/BookCover';
import { BookList } from '../components/BookList';
import { SecondaryButton } from '../components/Button';
import { SecondaryLink } from '../components/Link';
import { slugify } from '../utils/slugify';
import { Icon } from '../icons/Icons';
import { GraphCMSPreviewIndicator } from '../components/GraphCMSPreviewIndicator';
import { List } from '../components/List';

// const MAX_BOOK_DISPLAY_AMOUNT = 4;

function renderBook(book) {
  return (
    <BookCover
      link={{ to: `/books/${book.slug}` }}
      book={book}
      css={{ ...boxShadowLg }}
      key={book.id}
    >
      <Heading
        level={3}
        css={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',

          fontSize: s1,
          fontWeight: 'bold',
          color: COMPLIMENT,
        }}
      >
        {book.title}
      </Heading>
    </BookCover>
  );
}

function ContributorTemplate(props) {
  const { data, pageContext } = props;
  const { graphCmsContributor } = data;

  const { lastName, firstName, bookIllustrated, booksAuthored } =
    graphCmsContributor;

  return (
    <GlobalLayout>
      <GraphCMSPreviewIndicator />
      <MainMenu />
      <main css={{ position: 'relative' }}>
        <Section>
          <Container
            css={{
              ...flex('row', { alignItems: 'center' }),
              color: PRIMARY,
            }}
          >
            <Heading level={1}>{`${firstName} ${lastName}`}</Heading>{' '}
          </Container>

          {booksAuthored.length > 0 && (
            <Container>
              <Heading level={2} css={{ alignSelf: 'start' }}>
                Books Authored ({booksAuthored.length})
              </Heading>
              <BookList>{booksAuthored.map(renderBook)}</BookList>
            </Container>
          )}
          {bookIllustrated.length > 0 && (
            <Container>
              <Heading level={2} css={{ alignSelf: 'start' }}>
                Books Illustrated
              </Heading>
              <BookList>{bookIllustrated.map(renderBook)}</BookList>
            </Container>
          )}
        </Section>
      </main>
      <DebugData>{graphCmsContributor}</DebugData>
      <Footer />
    </GlobalLayout>
  );
}

export const query = graphql`
  query ContributorTemplateQuery($id: String) {
    graphCmsContributor(id: { eq: $id }) {
      id
      firstName
      lastName
      slug
      type
      bookIllustrated {
        updatedAt
        title
        slug
        tags {
          title
        }
        bookCover {
          altDescription
          width
          url
          size
          height
        }
      }
      booksAuthored {
        updatedAt
        title
        slug
        tags {
          title
        }
        bookCover {
          altDescription
          width
          url
          size
          height
        }
      }
    }
  }
`;

export default ContributorTemplate;
