/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import * as pluralize from 'pluralize';
// import SearchResults from 'react-filter-search';
// import { SearchFilter } from '../components/SearchFilter';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import {
  s1,
  flex,
  secondaryActionStyle,
  s025,
  PRIMARY80,
  base320,
  PRIMARY20,
  s05,
  onDesktopMedia,
  onTabletMedia,
  grid,
  PRIMARY40,
  PRIMARY,
  MIN_TOUCH_SIZE,
  s00625,
  base160,
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

function FilterTagCheckField(props) {
  const { tag, handleChange, checked } = props;
  return (
    <div css={{ padding: s05 }}>
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
        onChange={handleChange(tag)}
        checked={checked}
      />
      <label htmlFor={tag.id} key={tag.id}>
        <FilterTag
          css={[
            checked && {
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
}

function BooksPage({ data }) {
  const tagTypes = data.tagTypes.enumValues;
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
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gridTemplateAreas: `
                "heading heading heading heading heading heading heading heading heading heading heading heading"
                "filter filter content content content content content content content content content content"
                `,
                })
              ),
            ]}
          >
            <Container css={{ gridArea: 'heading', placeSelf: 'center' }}>
              <Heading level={1}>
                {pluralize('Book', filteredBooks.length, true)}
                {/* Books ({filteredBooks.length}) */}
              </Heading>
            </Container>
            <div
              // FILTER MENU OPTIONS
              css={[
                {
                  gridArea: 'filter',
                  width: 'max-content',
                  minWidth: 'min-content',
                  // minWidth: base160,
                  maxHeight: '66vh',

                  overflow: 'scroll',
                  backgroundColor: PRIMARY20,
                  borderRadius: `0 ${s1} ${s1} 0`,
                },

                onTabletMedia({
                  position: 'sticky',
                  placeSelf: 'start',
                  padding: s1,
                  top: 0,
                  // left: s1,
                  width: '100%',
                  // height: '100vh',
                }),
              ]}
            >
              <Accordion allowZeroExpanded={true} allowMultipleExpanded={true}>
                {tagTypes.map((tagType) => {
                  return (
                    <AccordionItem
                      css={{
                        width: '100%',
                        borderBottom: `${s00625} solid ${PRIMARY}`,
                      }}
                    >
                      <AccordionItemHeading>
                        <AccordionItemButton
                          css={{
                            padding: `${s1} 0`,
                            minHeight: MIN_TOUCH_SIZE,
                            // backgroundColor: PRIMARY40,
                          }}
                        >
                          {tagType.name.replace('_', ' ')}
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <List
                          css={{
                            listStyle: 'none',
                            ...flex('row', {
                              flexWrap: 'wrap',
                            }),
                          }}
                        >
                          {tags
                            // .filter((tag) => tag.books.length > 0)
                            .filter((tag) => tag.tagType === tagType.name)
                            .map((tag) => {
                              const isChecked = userFilters.some(
                                (filter) => filter.id === tag.id
                              );

                              return (
                                <FilterTagCheckField
                                  tag={tag}
                                  handleChange={handleFilterChecked}
                                  checked={isChecked}
                                />
                              );
                            })}
                        </List>
                      </AccordionItemPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
              {userFilters.length > 0 && (
                <SecondaryButton
                  css={{ position: 'sticky', bottom: 0 }}
                  onClick={() => {
                    setUserFilters([]);
                    setFilteredBooks(booksLookup);
                  }}
                >
                  Clear All
                </SecondaryButton>
              )}
            </div>

            <BookList
              css={[
                {
                  listStyle: 'none',
                  gridArea: 'content',
                  width: 'max-content',
                  placeSelf: 'start',
                },

                grid({
                  gridTemplateColumns: '1fr 1fr',
                  gridGap: s1,
                  placeItems: 'center',
                }),

                onTabletMedia({
                  padding: s1,
                  width: '100%',
                  gridTemplateColumns: `repeat(auto-fit, minmax(${base320}, 1fr))`,
                  // placeItems: 'end center',
                }),
              ]}
            >
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => {
                  return (
                    <BookCover book={book}>
                      <Heading level={4}>{book.title}</Heading>
                    </BookCover>
                  );
                })
              ) : (
                <>
                  {`Sorry, we don't have books under: ${userFilters
                    .map(({ title }) => title)
                    .join(', ')}`}
                  <SecondaryButton
                    onClick={() => {
                      setUserFilters([]);
                      setFilteredBooks(booksLookup);
                    }}
                  >
                    Clear All Filters
                  </SecondaryButton>
                </>
              )}
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
