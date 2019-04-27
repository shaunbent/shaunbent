const mdxFeed = require('gatsby-mdx/feed');

module.exports = {
  siteMetadata: {
    title: 'Shaun Bent',
    titlePrefix: 'Design System Architect',
    locale: 'en_GB',
    googleVerification: '',
    author: 'Shaun Bent',
    siteUrl: 'https://www.shaunbent.co.uk',
    social: {
      twitter: 'shaunbent',
      github: 'shaunbent'
    },
    description:
      'Design Systems Architect living in Stockholm working on scaling design at Spotify.',
    keywords: [
      'Design Systems',
      'Front End Development',
    ]
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
              sizeByPixelDensity: true
            }
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: mdxFeed
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Shaun Bent',
        short_name: 'Shaun Bent',
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#EE403D',
        display: 'minimal-ui',
        icon: 'src/images/icon.png'
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require('autoprefixer')({
            browsers: ['last 2 versions', 'ie >= 9', 'safari >= 7']
          }),
          require('cssnano')({
            discardComments: {
              removeAll: true
            },
            zindex: false,
            options: {
              sourcemap: false
            }
          })
        ]
      }
    }
  ]
};
