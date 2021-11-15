import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { DebugData } from '../components/DebugData';
import { UnderConstruction } from '../components/UnderConstruction';
import { isUnderContruction } from '../utils/environment';

function CategoryTemplate(props) {
  const { data, context } = props;

  return (
    <div>
      <UnderConstruction />
      <DebugData>{props}</DebugData>
    </div>
  );
}

export const query = graphql`
  query CategoryTemplate($slug: String) {
    graphCmsTopic(slug: { eq: $slug }) {
      title
      slug
    }
    graphCmsCategory(slug: { eq: $slug }) {
      title
      slug
      categoryType
    }
  }
`;

export default CategoryTemplate;
