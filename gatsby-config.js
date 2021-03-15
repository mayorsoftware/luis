module.exports = {
  siteMetadata: {
    title: `Forms Demo`,
    description: `Demo`,
    author: `@s_r_aman`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Forms `,
        short_name: `Forms`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon-black.png`, // This path is relative to the root of the site.
      },
    },

    {
      resolve: `gatsby-source-mongodb`,
      options: {
        connectionString: `mongodb://luis:forms1234@ds127995.mlab.com:27995`,
        collection: "forms",
        dbName: "forms",
      },
    },
  ],
}
