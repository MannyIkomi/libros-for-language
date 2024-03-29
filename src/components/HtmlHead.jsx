import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

import '../fonts/fonts.css';
import '../styles/normalize.css';

const HtmlHead = ({ title, description, image, imageDescription, url }) => {
  const { allGraphCmsSiteInformation, site } = useStaticQuery(graphql`
    query HtmlHeadQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allGraphCmsSiteInformation {
        nodes {
          title
          imageDescription
          image {
            url
          }
          description
        }
      }
    }
  `);

  const {
    title: siteTitle,
    description: siteDescription,
    image: siteImage,
    imageDescription: siteImageDescription,
  } = allGraphCmsSiteInformation.nodes[0];

  const pageTitle = title ?? siteTitle;
  const pageDescription = description ?? siteDescription;
  const pageImage = image ?? siteImage.url;
  const pageImageDescription = imageDescription ?? siteImageDescription;
  const pageUrl = url ?? site.siteMetadata.url;

  return (
    <Helmet htmlAttributes={{ lang: 'en' }}>
      <meta charSet="utf-8" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      {/* OPEN GRAPH */}
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:type" content={''} />

      {/* TWITTER */}
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {/* <meta name="twitter:creator" content={''} /> */}
      <meta name="twitter:site" content={siteTitle} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:image:alt" content={pageImageDescription} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};
export default HtmlHead;
