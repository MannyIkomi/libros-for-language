import React from 'react'
import { Helmet } from 'react-helmet'
import { SANS_FONT } from '../styles/index'
import '../fonts/fonts.css'

const HtmlHead = () => {
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
    </Helmet>
  )
}
export default HtmlHead
