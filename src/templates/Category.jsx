import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { DebugData } from '../components/DebugData';

function CategoryTemplate(props) {
  const { data, context } = props;
  // const tagData = useStaticQuery(graphql`
  //   query FooterQuery {
  //     categoryTypes: __type(name: "GraphCMS_CategoryType") {
  //       enumValues {
  //         name
  //       }
  //     }
  //     allGraphCmsGrade: allGraphCmsCategory(
  //       filter: { categoryType: { eq: Grade } }
  //     ) {
  //       nodes {
  //         title
  //         slug
  //         categoryType
  //       }
  //     }
  //     allGraphCmsGenre: allGraphCmsCategory(
  //       filter: { categoryType: { eq: Genre } }
  //     ) {
  //       nodes {
  //         title
  //         slug
  //         categoryType
  //       }
  //     }
  //     allGraphCmsLanguage: allGraphCmsCategory(
  //       filter: { categoryType: { eq: Language } }
  //     ) {
  //       nodes {
  //         title
  //         slug
  //         categoryType
  //       }
  //     }
  //     allGraphCmsText_Structure: allGraphCmsCategory(
  //       filter: { categoryType: { eq: Text_Structure } }
  //     ) {
  //       nodes {
  //         title
  //         slug
  //         categoryType
  //       }
  //     }
  //   }
  // `);

  return (
    <div>
      {/* <h1>{props}</h1> */}
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
