import React from 'react';
import { graphql } from 'gatsby';

function BookTemplate(props) {
  return <div>hi</div>;
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
