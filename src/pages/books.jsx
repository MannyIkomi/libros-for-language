/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import * as pluralize from 'pluralize';
// import SearchResults from 'react-filter-search';
// import { SearchFilter } from '../components/SearchFilter';

import {
  s1,
  flex,
  secondaryActionStyle,
  s025,
  base320,
  s05,
  onDesktopMedia,
  onTabletMedia,
  grid,
  PRIMARY40,
  PRIMARY,
} from '../styles';
import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { DebugData } from '../components/DebugData';

import { GlobalLayout } from '../components/GlobalLayout';

import { BookCover } from '../components/BookCover';
import { MainMenu } from '../components/MainMenu';
import { UnderConstruction } from '../components/UnderConstruction';
import { Section } from '../components/Section';
import { SecondaryButton } from '../components/Button';
import { List } from '../components/List';
import { FilterTag } from '../components/Tag';
import { BookList } from '../components/BookList';

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
  const [userFilters, setUserFilters] = useState([]);

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
  }, [userFilters]);

  return (
    <>
      <GlobalLayout>
        <MainMenu />

        <main
          css={[{ position: 'relative', overflow: 'scroll', height: '100vh' }]}
        >
          {/* <UnderConstruction /> */}

          <Section
            css={[
              onTabletMedia(
                grid({
                  gridTemplateAreas: `
                "heading heading heading heading heading heading heading heading heading heading heading heading"
                "filter filter content content content content content content content content content content"
                `,
                })
              ),
            ]}
          >
            <Container css={{ gridArea: 'heading' }}>
              <Heading level={1}>
                {pluralize('Book', filteredBooks.length, true)}
                {/* Books ({filteredBooks.length}) */}
              </Heading>
            </Container>
            <div
              css={[
                { gridArea: 'filter' },
                onTabletMedia({
                  position: 'sticky',
                  placeSelf: 'start',
                  top: s1,
                  // left: s1,
                  width: '100%',
                  // height: '100vh',
                }),
              ]}
            >
              <List
                css={{
                  listStyle: 'none',
                  ...flex('row', {
                    flexWrap: 'wrap',
                    gap: s1,
                  }),
                }}
              >
                {tags
                  .filter((tag) => tag.books.length > 0)
                  .map((tag) => {
                    const isChecked = userFilters.some(
                      (filter) => filter.id === tag.id
                    );

                    return (
                      <div>
                        {/* convert to accessible custom checkboxes */}
                        <input
                          type={'checkbox'}
                          id={tag.id}
                          name={tag.slug}
                          value={tag.title}
                          css={[
                            {
                              opacity: '0',
                              position: 'absolute',
                            },
                          ]}
                          onChange={handleFilterChecked(tag)}
                          checked={isChecked}
                        />
                        <label
                          htmlFor={tag.id}
                          key={tag.id}

                          // css={[
                          //   secondaryActionStyle,
                          //   {
                          //     padding: `${s025} ${s05}`,
                          //     '&::focus': {
                          //       backgroundColor: 'red',
                          //     },
                          //   },
                          // ]}
                        >
                          <FilterTag
                            css={[
                              isChecked && {
                                backgroundColor: PRIMARY40,
                                borderColor: PRIMARY,
                              },
                            ]}
                          >
                            {tag.title}
                          </FilterTag>
                        </label>
                      </div>
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
            </div>

            <BookList
              css={[
                { listStyle: 'none' },
                { gridArea: 'content', width: '100%' },
                flex('row', {
                  flexWrap: 'wrap',
                }),
                // grid({
                //   gridTemplateColumns: '1fr 1fr',
                //   gap: s1,
                //   placeItems: 'end stretch',
                // }),
                // onTabletMedia({
                //   width: '100%',
                //   gridTemplateColumns: `repeat(auto-fit, minmax(${base320}, 1fr))`,
                //   placeItems: 'end center',
                // }),
              ]}
            >
              {filteredBooks.length > 0
                ? filteredBooks.map((book) => {
                    return (
                      <BookCover book={book}>
                        <Heading level={4}>{book.title}</Heading>
                      </BookCover>
                    );
                  })
                : `Sorry, we don't have books under: ${userFilters
                    .map(({ title }) => title)
                    .join(', ')}`}
            </BookList>
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
        books {
          id
        }
      }
    }

    allGraphCmsBook {
      nodes {
        id
        title
        slug
        tags {
          title
          slug
          id
        }
        bookCover {
          altDescription
          height
          width
          size
          url
        }
      }
    }
  }
`;

export default BooksPage;
