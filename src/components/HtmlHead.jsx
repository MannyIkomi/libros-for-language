import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
import '../fonts/fonts.css';
import '../styles/normalize.css';

const HtmlHead = ({ title, description, image, imageDescription }) => {
  const { graphCmsSiteInformation } = useStaticQuery(graphql`
    query MyQuery {
      graphCmsSiteInformation {
        title
        description
        image {
          id
        }
      }
    }
  `);
  const {
    title: siteTitle,
    siteDescription,
    image: siteImage,
    imageDescription: siteImageDescription,
  } = graphCmsSiteInformation;
  const pageTitle = title ?? siteTitle;
  const pageDescription = description ?? siteDescription;
  const pageImage = image ?? siteImage;
  const pageImageDescription = imageDescription ?? siteImageDescription;

  return (
    <Helmet htmlAttributes={{ lang: 'en' }}>
      <meta charSet="utf-8" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      {/* OPEN GRAPH */}
      <meta property="og:url" content={''} />
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
