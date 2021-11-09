import React from 'react';
import { graphql } from 'gatsby';
import { DebugData } from '../components/DebugData';

function BookTemplate({ data }) {
  return (
    <div>
      <h1>{data.graphCmsBook.bookTitle}</h1>
      <DebugData>{data.graphCmsBook}</DebugData>
    </div>
  );
}

export const query = graphql`
  query BookTemplate($slug: String) {
    graphCmsBook(slug: { eq: $slug }) {
      bookTitle
      slug
    }
  }
`;

export default BookTemplate;
