/* eslint-disable import/no-extraneous-dependencies,@typescript-eslint/no-var-requires */
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({
      node,
      getNode,
      trailingSlash: false,
    }).replace(/\/index.zh-CN$/, '')
    const isComponents = /\/components\//.test(node.fileAbsolutePath)
    const route = isComponents ? '/components' : ''
    createNodeField({
      node,
      name: 'slug',
      value,
    })
    createNodeField({
      node,
      name: 'route',
      value: route,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      {
        allMdx {
          edges {
            node {
              id
              fileAbsolutePath
              frontmatter {
                title
              }
              fields {
                slug
                route
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  const data = result.data.allMdx.edges

  // Handle errors

  // Create pages for each markdown file.
  const blogPostTemplate = path.resolve(
    'plugins/gatsby-theme-bear/src/component-layout.js'
  )

  data.forEach(({ node }) => {
    createPage({
      path: `${node.fields.route}${node.fields.slug}`,
      component: blogPostTemplate,
      context: {
        id: node.id,
        slug: node.fields.slug,
        // ...node,
        // used a back link in SourceLayout
      },
    })
  })
}
