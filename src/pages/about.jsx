/** @jsx jsx */
import * as React from 'react';
import { graphql } from 'gatsby';
import { jsx } from '@emotion/react';
import {
  notoSerif,
  PRIMARY,
  s1,
  COMPLIMENT80,
  base160,
  base320,
  onTabletMedia,
  flex,
  grid,
} from '../styles';
import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { Container, TextContainer } from '../components/Container';
import { DebugData } from '../components/DebugData';

import { Link, PrimaryLink } from '../components/Link';

import { GlobalLayout } from '../components/GlobalLayout';

import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';

import ALALogo from '../images/ALA Logo.png';
console.log(ALALogo);

function TeamMemberBio(props) {
  const { id, portrait, fullName, role, description } = props;

  return (
    <Container
      key={id}
      css={[
        {
          width: '100%',
          ...flex('column', {
            alignItems: 'flex-start',
          }),
        },
      ]}
    >
      {portrait && (
        <div
          css={{
            borderRadius: '100%',
            overflow: 'hidden',
          }}
        >
          <img
            src={portrait?.url}
            width={portrait?.width}
            height={portrait?.height}
            // loading="eager"
            alt={portrait?.altDescription}
            css={{
              display: 'block',
              width: '100%',
              height: 'auto',
              aspectRatio: `${portrait?.width} / ${portrait?.height}`,

              maxWidth: base320,
              maxHeight: base320,
            }}
          />
        </div>
      )}
      <Heading level={3}>{fullName}</Heading>
      {role && (
        <TextContainer>
          <p>
            <strong>{role}</strong>
          </p>
        </TextContainer>
      )}
      {description && (
        <TextContainer>
          <p>{description}</p>
        </TextContainer>
      )}
    </Container>
  );
}

function AboutPage({ data }) {
  const teamMembers = data.allGraphCmsTeamMember.nodes;

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
            <Container css={{ alignSelf: 'center' }}>
              <TextContainer>
                <Heading level={1}>Libros for Language</Heading>

                <p>
                  Libros for Language is a digital library designed to support
                  teachers in finding and using translanguaging books to support
                  fluid language practices in their classrooms. All of the books
                  use English and one or more other languages, making them
                  appropriate for English-medium as well as bilingual
                  classrooms.
                </p>
              </TextContainer>

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
            <Container
              css={[
                onTabletMedia({
                  ...grid({
                    gridTemplateColumns: '1fr 1fr',
                    gridTempalteRows: '1fr 1fr',

                    placeItems: 'start',
                  }),
                }),
              ]}
            >
              {teamMembers.map((person) => (
                <TeamMemberBio {...person} key={person.id} />
              ))}
            </Container>
          </Section>

          <Section>
            <Container>
              <TextContainer>
                <img
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
    allGraphCmsTeamMember {
      nodes {
        role
        fullName
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
