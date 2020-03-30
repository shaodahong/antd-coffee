const remarkTypescript = require('remark-typescript')

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'components',
        path: `${process.cwd()}/components`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'index',
        path: `${process.cwd()}/README.md`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: `${process.cwd()}/docs`,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          default: require.resolve('./src/component-layout.js'),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: 100,
              className: 'bear-title-anchor',
            },
          },
          'gatsby-remark-prismjs',
        ],
      },
    },
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-less',
      options: {
        // https://github.com/ant-design/ant-motion/issues/44
        javascriptEnabled: true,
      },
    },
  ],
}
