const replacePath = (path) => (path === `/` ? path : path.replace(/\/$/, ``))
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode }).replace(/\/$/, '')
    createNodeField({
      node,
      name: `slug`,
      value,
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
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const data = result.data.allMdx.edges

  // Handle errors

  // Create pages for each markdown file.
  const blogPostTemplate = path.resolve(
    'plugins/gatsby-theme-bear/src/component-layout.js'
  )

  data.forEach(({ node }, index) => {
    createPage({
      path: `components${node.fields.slug}`,
      component: blogPostTemplate,
      context: {
        id: node.id,
        slug: node.fields.slug,
        // ...node,
        // used a back link in SourceLayout
      },
    })
  })

  // result.data.allMarkdownRemark.edges.forEach(({ node }) => {
  //   const path = 'component'
  //   createPage({
  //     path,
  //     component: blogPostTemplate,
  //     // In your blog post template's graphql query, you can use pagePath
  //     // as a GraphQL variable to query for data from the markdown file.
  //     context: {
  //       pagePath: path,
  //     },
  //   })
  // })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  // You can access the variable "house" in your page queries now
  createPage({
    ...page,
    context: {
      ...page.context,
      house: `Gryffindor`,
    },
  })
}
