/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import SearchResults from 'react-filter-search';
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
  secondaryActionStyle,
} from '../styles';
import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { DebugData } from '../components/DebugData';

import { GlobalLayout } from '../components/GlobalLayout';

import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
import { SecondaryButton } from '../components/Button';
import { List } from '../components/List';
import { filter } from 'react-filter-search/lib/filter';

function withTagProperties(book) {
  if (book.tags === 0) {
    return book;
  }
  const tagFilters = book.tags.reduce((prev, current) => {
    return { ...prev, [current.slug]: true };
  }, {});

  return { ...book, ...tagFilters };
}

function BooksPage({ data }) {
  const tagTypes = data.tagTypes.nodes;
  const tags = data.allGraphCmsTag.nodes;
  const books = data.allGraphCmsBook.nodes.filter(
    (book) => book.tags.length > 0
  );

  const booksLookup = books.map(withTagProperties);

  const [filteredBooks, setFilteredBooks] = useState(booksLookup);
  const [userFilters, setUserFilters] = useState(
    []
    // DICTIONARY LOOKUP METHOD
    // tags.reduce((prev, current) => {
    //   return { ...prev, [current.slug]: false };
    // }, {})
  );

  const withAppliedFilters = booksLookup.filter((book) => {
    return userFilters.every((tagFilter) => {
      console.log(tagFilter.title, 'on', book);
      return book[tagFilter.slug] === true ? true : false;
    });
  });

  const handleFilterChecked = (option) => (e) => {
    const checked = e.target.checked;

    console.log('BOOKS', filteredBooks);
    console.log('FILTERS', userFilters);
    console.log(option.title, checked);

    checked
      ? setUserFilters([...userFilters, option])
      : setUserFilters(userFilters.filter((tag) => tag.id !== option.id));
  };

  useEffect(() => {
    userFilters.length === 0
      ? setFilteredBooks(booksLookup)
      : setFilteredBooks(withAppliedFilters);

    console.log(
      'withAppliedFilters',
      withAppliedFilters.length,
      withAppliedFilters
    );
  }, [userFilters]);

  return (
    <>
      <GlobalLayout>
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section>
            <Container>
              <Heading level={1}>Books</Heading>
              {/* <SearchFilter></SearchFilter> */}
              <div></div>
            </Container>
          </Section>
          <Section>
            <aside>
              <List
                css={{
                  listStyle: 'none',
                  ...flex('row', {
                    flexWrap: 'wrap',
                    gap: s1,
                  }),
                }}
              >
                {tags.map((tag) => {
                  const isChecked = userFilters.some(
                    (filter) => filter.id === tag.id
                  );

                  return (
                    <label
                      htmlFor={tag.id}
                      key={tag.id}
                      css={[secondaryActionStyle]}
                    >
                      <input
                        type={'checkbox'}
                        id={tag.id}
                        name={tag.slug}
                        value={tag.title}
                        onLoad={handleFilterChecked(tag)}
                        onChange={handleFilterChecked(tag)}
                        checked={isChecked}
                      />
                      {tag.title}
                    </label>
                  );
                })}
              </List>
              <SecondaryButton
                onClick={() => {
                  setUserFilters([]);
                  setFilteredBooks(booksLookup);
                }}
              >
                Clear All
              </SecondaryButton>
            </aside>
            <DebugData>{userFilters}</DebugData>
            Matches {filteredBooks.length}
            <DebugData>{filteredBooks}</DebugData>
            {/* <SearchResults
              value={}
              data={books}
              renderResults={(results) => {
                <DebugData>{results}</DebugData>;
              }}
            /> */}
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
        id
        tagType
        slug
        title
      }
    }

    allGraphCmsBook {
      nodes {
        id
        bookTitle
        slug
        tags {
          title
          slug
          id
        }
      }
    }
  }
`;

export default BooksPage;
