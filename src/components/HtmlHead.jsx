import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { SANS_FONT } from '../styles/index';
import '../fonts/fonts.css';
import '../styles/normalize.css';
// import jQuery from 'jquery';

const HtmlHead = () => {
  useEffect(() => {
    // https://kenwheeler.github.io/slick/
    // when document is fully loaded
    window.addEventListener('load', (event) => {
      console.log('DOM fully loaded and parsed');
    });
  });

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Home - Libros for Language</title>
      <meta name="description" content="LFL Description" />

      {/* OPEN GRAPH */}
      <meta property="og:url" content={''} />
      <meta property="og:title" content={''} />
      <meta property="og:description" content={''} />
      <meta property="og:image" content={''} />
      <meta property="og:type" content={''} />

      {/* TWITTER */}
      <meta name="twitter:title" content={''} />
      <meta name="twitter:description" content={''} />
      <meta name="twitter:creator" content={''} />
      <meta name="twitter:site" content={''} />
      <meta name="twitter:image" content={''} />
      <meta name="twitter:image:alt" content={''} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* from Webflow */}
      {/* <script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
        crossorigin="anonymous"
      ></script>

      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
      ></script> */}
    </Helmet>
  );
};
export default HtmlHead;
