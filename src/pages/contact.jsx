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
import { GraphCMSPreviewIndicator } from '../components/GraphCMSPreviewIndicator';
import { UnderConstruction } from '../components/UnderConstruction';

function ContactPage({ data }) {
  const teamMembers = data.allGraphCmsTeamMember.nodes;
  const totalBooks = data.allGraphCmsBook.totalCount;

  return (
    <>
      <UnderConstruction />
      <GlobalLayout>
        <GraphCMSPreviewIndicator />
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section>
            <Container>
              <TextContainer>
                <Heading level={1}>Contact Us</Heading>
                <ContactForm />
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
  query ContactPageQuery {
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

export default ContactPage;
