/** @jsx jsx */
import * as React from 'react';
import { graphql } from 'gatsby';
import { jsx } from '@emotion/react';
import {
  notoSerif,
  PRIMARY,
  s1,
  COMPLIMENT80,
  base320,
  secondaryActionStyle,
  tertiaryActionStyle,
  COMPLIMENT20,
  onTabletMedia,
  grid,
  s0125,
  boxShadowLg,
  base16,
  COMPLIMENT40,
  s2,
  WHITE,
} from '../styles';
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

function AboutPage({ data }) {
  const teamMembers = data.allGraphCmsTeamMember.nodes;
  const totalBooks = data.allGraphCmsBook.totalCount;

  return (
    <>
      <GlobalLayout>
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
                { alignSelf: 'center' },
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
                  A Curated Collection of {totalBooks ? totalBooks : ''}{' '}
                  Translanguaging Books
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
                <Heading level={3}>What is Translanguaging?</Heading>
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
                Learn About our Typology
              </PrimaryLink>
              <TertiaryLink to={'/resources'}>
                Translanguaging Resources
              </TertiaryLink>
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
              <TextContainer>
                <img
                  css={{ maxWidth: base320 }}
                  src={ALALogo}
                  alt={'ALA American Library Association Logo'}
                />
                <Heading level={4}>
                  Funded by the American Library Association's Carnegie-Whitney
                  Grant
                </Heading>
                <p>
                  The Carnegie Whitney Awards have been established to provide
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
