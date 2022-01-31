/** @jsx jsx */
import * as React from 'react';
import { graphql } from 'gatsby';
import { jsx } from '@emotion/react';
import { s1, base320, onTabletMedia, grid, s2, WHITE } from '../styles';
import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { Container, TextContainer } from '../components/Container';
import { DebugData } from '../components/DebugData';

import { Link, PrimaryLink, TertiaryLink } from '../components/Link';

import { GlobalLayout } from '../components/GlobalLayout';

import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';

import ALALogo from '../images/ALA-Logo.png';
import { SecondaryButton } from '../components/Button';
import { List } from '../components/List';
import { TeamMemberBio } from '../components/TeamMemberBio';
import ContactForm from '../components/ContactForm';
import { GatsbyPreviewIndicator } from '../components/GatsbyPreviewIndicator';

function AboutPage({ data }) {
  const teamMembers = data.allGraphCmsTeamMember.nodes;
  const totalBooks = data.allGraphCmsBook.totalCount;
  const bookCount = data.allGraphCmsBook.nodes.filter(
    (book) => book.tags.length > 0
  ).length;

  return (
    <>
      <GlobalLayout
        htmlHead={{
          title: 'About Libros for Language',
          description: `The books on this site are examples of authors and illustrators who incorporate LOTE (Languages Other Than English) in their work, just as all multilingual people do in their daily lives.`,
        }}
      >
        <GatsbyPreviewIndicator />
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section
            css={{
              overflow: 'hidden',
              minHeight: '80vh',
              marginBottom: '10vh',

              alignItems: 'initial',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Container
              css={[
                { alignSelf: 'center', gap: s2 },
                // onTabletMedia({
                //   ...grid({
                //     gridTemplateColumns: '1fr 1fr',
                //     gridTemplateRows: '1fr 1fr',
                //   }),
                // }),
              ]}
            >
              <TextContainer>
                <Heading level={1}>
                  A Curated Collection of {bookCount} Translanguaging Books
                </Heading>
                <p>
                  Libros for Language is a digital library designed to support
                  teachers in finding and using translanguaging books to support
                  fluid language practices in their classrooms. The books on
                  this site are examples of
                  <Link>authors and illustrators</Link>
                  who incorporate <em>LOTE</em> (Languages Other Than English)
                  in their work, just as all multilingual people do in their
                  daily lives.
                </p>
              </TextContainer>
              {/* <img
                src="https://via.placeholder.com/1080x1080?text=Translanguaging+Info+Placeholder"
                alt="placeholder"
                css={[
                  {
                    width: '100%',
                    height: 'auto',
                  },
                  onTabletMedia({
                    gridRow: '1 / -1',
                    gridColumn: '2 / -1',
                  }),
                ]}
              /> */}
              <TextContainer>
                <Heading level={2}>What is Translanguaging?</Heading>
                <p>
                  Translanguaging is a natural phenomenon in which bilingual and
                  multilingual people draw from all their linguistic resources
                  to make meaning, mixing and integrating their languages in
                  fluid, dynamic ways depending on context and purpose.
                  Translanguaging is also a powerful teaching tool, with which
                  teachers (both monolingual and multilingual) can create
                  classroom spaces that embrace all forms of linguistic
                  expression and encourage emerging multilingual students to use
                  their full linguistic repertoires as they work toward their
                  academic goals.
                </p>
              </TextContainer>
              <PrimaryLink to={'/typology'} css={{ color: WHITE }}>
                Learn About Our Typology
              </PrimaryLink>
              <TertiaryLink to={'/resources'}>
                Translanguaging Resources
              </TertiaryLink>
            </Container>
          </Section>

          <Section>
            <Container>
              <TextContainer>
                <Heading level={2}>
                  Libros for Language is a resource for both monolingual and
                  bilingual teachers.
                </Heading>
                <p>
                  If you are trying to incorporate quality mentor texts into
                  your existing curricular units, try browsing{' '}
                  <Link to={`/tags/topics`}>by topic</Link> or{' '}
                  <Link to={`/tags/grades`}>grade level</Link>. If you have only
                  one or two languages represented in your classroom, searching{' '}
                  <Link to={`/tags/languages`}>by language</Link> may be
                  preferable so you can best meet the needs of your students.
                </p>
                <p>
                  This site is meant to serve as a digital bibliography with
                  some key information to guide your selections. We do not offer
                  specific curriculum ideas or lesson plans to accompany the
                  texts, because we believe the best way to implement a book
                  will depend on the needs of particular students, teachers, and
                  contexts. We also believe in teacher autonomy and expertise,
                  and offer a variety of{' '}
                  <Link to={'/resources'}>
                    resources to help guide your study of translanguaging
                  </Link>
                  .
                </p>
                <p>
                  Over time, we hope the site can become a repository for the
                  exchange of teachers’ and librarians’ collective knowledge and
                  expertise in utilizing mentor texts.
                </p>
              </TextContainer>
            </Container>
          </Section>

          <Section>
            <Container
              css={{
                alignItems: 'flex-start',
              }}
            >
              <Heading level={2}>Meet the Team</Heading>
            </Container>
            <Container>
              <List
                css={[
                  { listStyle: 'none' },
                  onTabletMedia({
                    ...grid({
                      gridTemplateColumns: '1fr 1fr',
                      gridTempalteRows: '1fr 1fr',

                      placeItems: 'start',
                      gridGap: s2,
                    }),
                  }),
                ]}
              >
                {teamMembers.map((person) => (
                  <TeamMemberBio
                    {...person}
                    key={person.id}
                    css={{ marginBottom: s1 }}
                  />
                ))}
              </List>
            </Container>
          </Section>

          <Section>
            <Container>
              <TextContainer css={{ gap: s2 }}>
                <img
                  css={{ maxWidth: base320 }}
                  src={ALALogo}
                  alt={'ALA American Library Association Logo'}
                />
                <Heading
                  level={4}
                  css={[{ margin: 0 }, onTabletMedia({ margin: 0 })]}
                >
                  Funded by the American Library Association's Carnegie-Whitney
                  Grant
                </Heading>
                <p>
                  The Carnegie-Whitney Awards have been established to provide
                  grants for the preparation and publication of popular or
                  scholarly reading lists, indexes and other guides to library
                  resources that will be useful to users of all types of
                  libraries.
                </p>
              </TextContainer>
            </Container>
          </Section>
        </main>
        <Footer />
      </GlobalLayout>
    </>
  );
}

export const query = graphql`
  query AboutPageQuery {
    allGraphCmsBook {
      totalCount
      nodes {
        tags {
          title
        }
      }
    }
    allGraphCmsTeamMember(sort: { fields: lastName, order: ASC }) {
      nodes {
        role
        name
        lastName
        firstName
        description
        id
        webLink
        webLinkLabel
        portrait {
          altDescription
          id
          url
          width
          height
        }
      }
    }
  }
`;

export default AboutPage;
