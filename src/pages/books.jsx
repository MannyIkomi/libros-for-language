/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import * as pluralize from 'pluralize';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import FilterResults from 'react-filter-search';
import { useForm } from 'react-hook-form';

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
  s2,
  base24,
} from '../styles';
import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { DebugData } from '../components/DebugData';
import { GlobalLayout } from '../components/GlobalLayout';
import { BookCover } from '../components/BookCover';
import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
import { Button, SecondaryButton } from '../components/Button';
import { List } from '../components/List';
import { FilterTag } from '../components/Tag';
import { BookList } from '../components/BookList';
import FilterIconSVG from '../icons/Filter';
import useToggleSwitch from '../hooks/useToggleSwitch';
import TagIcon from '../icons/Icons';
import { MenuTriangle } from '../icons/MenuTriangle';
import { GatsbyPreviewIndicator } from '../components/GatsbyPreviewIndicator';
import { HiddenAccessibleText } from '../components/HiddenAccessibleText';
import { TextField } from '../components/TextField';
import { IconLabel } from '../components/IconLabel';

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
  const { control, watch, setValue } = useForm();
  const searchValue = watch('search');

  const [filteredBooksByTag, setFilteredBooksByTag] = useState(booksLookup);
  const [booksAmount, setBooksAmount] = useState(filteredBooksByTag.length);
  const [userFilters, setUserFilters] = useState([]);
  const [isToggled, setToggled] = useToggleSwitch(false);

  const withAppliedFilters = booksLookup.filter((book) => {
    return userFilters.every((tagFilter) => {
      return book[tagFilter.slug] === true ? true : false;
    });
  });

  const handleFilterChecked = (option) => (e) => {
    const checked = e.target.checked;
    checked
      ? setUserFilters([...userFilters, option])
      : setUserFilters(userFilters.filter((tag) => tag.id !== option.id));
  };

  useEffect(() => {
    userFilters.length === 0
      ? setFilteredBooksByTag(booksLookup)
      : setFilteredBooksByTag(withAppliedFilters);
  }, [userFilters]);

  const userCriteriaString = [
    searchValue,
    ...userFilters.map(({ title }) => title),
  ]
    .filter((book) => book) // remove searchValue if undefined
    .join(', ');

  const hasUserCriteria = userFilters.length > 0 || searchValue;
  return (
    <>
      <GlobalLayout>
        <GatsbyPreviewIndicator />
        <MainMenu />

        <main
          css={[{ position: 'relative', overflow: 'scroll', height: '100vh' }]}
        >
          <Section
            css={[
              grid({
                gridTemplateAreas: `"heading filterMenu" "results results"`,
              }),
              onTabletMedia(
                grid({
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gridTemplateAreas: `
                ". . heading heading heading heading heading heading heading heading heading heading"
                ". . choices choices choices choices choices choices choices choices choices choices"
                "filter filter results results results results results results results results results results"
                `,
                })
              ),
            ]}
          >
            <Container
              css={[
                { gridArea: 'heading' },
                onTabletMedia({ gridArea: 'heading' }),
              ]}
            >
              <Heading level={1} css={{ placeSelf: 'start' }}>
                {pluralize('Book', booksAmount, true)}
              </Heading>
            </Container>
            <Button
              onClick={(e) => {
                setToggled(!isToggled);
              }}
              css={[
                {
                  ...flex('column'),
                  alignItems: 'center',
                  width: MIN_TOUCH_SIZE,
                  height: MIN_TOUCH_SIZE,

                  gridArea: 'filterMenu',
                  placeSelf: 'center end',
                  background: 'none',
                  border: 0,
                },
                onTabletMedia({
                  display: 'none',
                }),
              ]}
            >
              <FilterIconSVG hasActiveFilters={hasUserCriteria} />
              <IconLabel css={{ position: 'absolute', bottom: 0 }}>
                Search & Filter
              </IconLabel>
            </Button>

            {hasUserCriteria && (
              <Container
                css={[
                  { display: 'none' },
                  onTabletMedia({
                    gridArea: 'choices',
                    placeSelf: 'end start',
                    ...flex('row', {
                      alignItems: 'center',
                    }),
                  }),
                ]}
              >
                <p>"{userCriteriaString}"</p>
              </Container>
            )}

            <div
              // FILTER MENU OPTIONS
              css={[
                {
                  display: isToggled ? 'block' : 'none',
                  position: 'fixed',
                  bottom: 0,
                  right: 0,
                  gridRow: '1',
                  backgroundColor: PRIMARY20,
                  width: '100%',
                  minWidth: 'min-content',
                  maxHeight: '50vh',
                  overflow: 'scroll',
                },

                onTabletMedia({
                  display: 'block',
                  gridArea: 'filter',
                  maxHeight: '66vh',
                  // minWidth: base160,

                  overflow: 'scroll',
                  borderRadius: `0 ${s1} ${s1} 0`,

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
              <form
                role={'search'}
                onSubmit={(e) => {
                  e.preventDefault();
                  return false;
                }}
                css={[
                  { padding: s05, margin: `${s1} 0` },
                  onTabletMedia({ padding: 0 }),
                ]}
              >
                <TextField
                  label={{ children: 'Search' }}
                  input={{
                    name: 'search',
                    placeholder: 'Title, ISBN, Publisher…',
                    type: 'search',
                  }}
                  control={control}
                />
              </form>
              <div css={{ borderBottom: `${s00625} solid ${PRIMARY}` }} />
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
                          css={[
                            {
                              ...flex('row'),
                              alignItems: 'center',
                              justifyContent: 'space-between',

                              padding: `${s1} ${s05}`,
                              minHeight: MIN_TOUCH_SIZE,
                            },
                            onTabletMedia({
                              padding: `${s1} 0`,
                            }),
                          ]}
                        >
                          <div css={{ ...flex('row'), alignItems: 'center' }}>
                            <TagIcon
                              name={tagType.name}
                              css={{ width: base24, height: base24 }}
                            />
                            {tagType.name.replace('_', ' ')}
                          </div>
                          <AccordionItemState>
                            {({ expanded }) => <MenuTriangle open={expanded} />}
                          </AccordionItemState>
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
                            .filter((tag) => tag.books.length > 0)
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
              {hasUserCriteria && (
                <SecondaryButton
                  css={{ position: 'sticky', bottom: 0 }}
                  onClick={() => {
                    setUserFilters([]);
                    setValue('search', '');
                    setFilteredBooksByTag(booksLookup);
                  }}
                >
                  Clear Filters
                </SecondaryButton>
              )}
            </div>

            <FilterResults
              value={searchValue || ''}
              data={filteredBooksByTag}
              pick={['title', 'isbn', 'publisher']}
              renderResults={(results) => {
                setBooksAmount(results.length);
                return results.length > 0 ? (
                  <BookList
                    css={[
                      {
                        gridArea: 'results',
                        padding: s1,
                      },

                      onTabletMedia({
                        gridArea: 'results',
                        // gridTemplateColumns: `repeat(auto-fill, minmax(${base320}, 1fr))`,
                        gridGap: s2,
                        width: 'max-content',

                        padding: s1,
                        width: '100%',
                      }),
                    ]}
                  >
                    {results.map((book) => {
                      return (
                        <BookCover book={book} key={book.id}>
                          <HiddenAccessibleText>
                            <Heading
                              level={2}
                              css={[
                                { fontSize: s1 },

                                onTabletMedia({ fontSize: s1 }),
                              ]}
                            >
                              {book.title}
                            </Heading>
                          </HiddenAccessibleText>
                        </BookCover>
                      );
                    })}
                  </BookList>
                ) : (
                  <Container css={{ gridArea: 'results' }}>
                    <p css={{ textAlign: 'center' }}>
                      Sorry, we don't have books that match your criteria:{' '}
                      <br />"{userCriteriaString}"
                    </p>
                    <SecondaryButton
                      onClick={() => {
                        setUserFilters([]);
                        setValue('search', '');
                        setFilteredBooksByTag(booksLookup);
                      }}
                    >
                      Clear Filters
                    </SecondaryButton>
                  </Container>
                );
              }}
            />
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

    allGraphCmsBook(sort: { fields: updatedAt, order: DESC }) {
      nodes {
        id
        title
        slug
        awards
        publisher
        isbn

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
