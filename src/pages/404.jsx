import * as React from 'react';
import { Container, TextContainer } from '../components/Container';
import { GlobalLayout } from '../components/GlobalLayout';
import { Link, PrimaryLink } from '../components/Link';
import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
import { notoMono, s2 } from '../styles';

// styles
const pageStyles = {
  color: '#232129',
  padding: '96px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles = {
  marginBottom: 48,
};
const codeStyles = {
  color: '#8A6534',
  padding: 4,
  backgroundColor: '#FFF4DB',
  fontSize: '1.25rem',
  borderRadius: 4,
};

// markup
const NotFoundPage = () => {
  return (
    <GlobalLayout htmlHead={{ title: 'Not Found' }}>
      <MainMenu />
      <main>
        <Section>
          <Container>
            <TextContainer css={{ textAlign: 'center', gap: s2 }}>
              <h1>Sorry we couldn't find that page!</h1>
              <PrimaryLink to="/">Back to Home</PrimaryLink>
            </TextContainer>
          </Container>
        </Section>
      </main>
    </GlobalLayout>
  );
};

export default NotFoundPage;
