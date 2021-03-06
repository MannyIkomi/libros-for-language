import * as React from 'react';
import { Container, TextContainer } from '../components/Container';
import { GlobalLayout } from '../components/GlobalLayout';
import { Heading } from '../components/Heading';
import { PrimaryLink } from '../components/Link';
import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
import { s2 } from '../styles';

function NotFoundPage() {
  return (
    <GlobalLayout htmlHead={{ title: 'Not Found' }}>
      <MainMenu />
      <main>
        <Section>
          <Container>
            <TextContainer
              css={{ textAlign: 'center', gap: s2, alignItems: 'center' }}
            >
              <Heading level={1}>Sorry we couldn't find that page!</Heading>
              <PrimaryLink to="/">Back to Home</PrimaryLink>
            </TextContainer>
          </Container>
        </Section>
      </main>
    </GlobalLayout>
  );
}

export default NotFoundPage;
