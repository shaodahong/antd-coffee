module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'components',
        path: `${process.cwd()}/components`,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-page-creator',
    //   options: {
    //     path: `${process.cwd()}/components`,
    //     ignore: [`index.md`],
    //   },
    // },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          default: require.resolve('./src/component-layout.js'),
        },
        gatsbyRemarkPlugins: ['gatsby-remark-prismjs'],
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
    // {
    //   resolve: 'gatsby-transformer-remark',
    //   options: {
    //     plugins: [
    //       {
    //         resolve: 'gatsby-remark-prismjs',
    //         options: {
    //         },
    //       },
    //     ],
    //   },
    // },
  ],
}
