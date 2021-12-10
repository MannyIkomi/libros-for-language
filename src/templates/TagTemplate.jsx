/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';
import { DebugData } from '../components/DebugData';
import { UnderConstruction } from '../components/UnderConstruction';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { GlobalLayout } from '../components/GlobalLayout';
import { MainMenu } from '../components/MainMenu';
import { Heading } from '../components/Heading';

function TagTemplate(props) {
  const { data, pageContext } = props;
  // const { graphCmsTag } = data;

  return (
    <div>
      <UnderConstruction />

      <GlobalLayout>
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Container css={{ alignItems: 'flex-start' }}>
            <Heading level={1}>{pageContext.title}</Heading>
          </Container>
          TAG TEMPLATE
        </main>
        <DebugData>{data}</DebugData>
        <Footer />
      </GlobalLayout>
    </div>
  );
}

export const query = graphql`
  query TagTemplateQuery($slug: String) {
    graphCmsTag(slug: { eq: $slug }) {
      books {
        bookCover {
          altDescription
          url
          width
          height
        }
        slug
        id
        bookTitle
      }
      title
      slug
      id
    }
    graphCmsTag(slug: { eq: $slug }) {
      title
      slug
      tagType
      id
      books {
        bookTitle
        slug
        tags {
          title
        }
        bookCover {
          altDescription
          width
          url
          size
          height
        }
      }
    }
  }
`;

export default TagTemplate;
