require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: 'https://librosforlanguage.org',
    title: 'Libros for Language',
  },
  plugins: [
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
        stages: [
          process.env.NODE_ENV === 'development' ? 'DRAFT' : 'PUBLISHED',
        ],
        buildMarkdownNodes: true,
      },
    },
    `gatsby-plugin-mdx`,

    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        icon: './src/images/favicon.svg',
      },
    },
    // 'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
  ],
};
