/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Typography from 'antd/lib/typography'
import Divider from 'antd/lib/divider'
import { MDXProvider } from '@mdx-js/react'
import HeaderLayout from './header-layout'
import SiderbarLayout from './siderbar-layout'

const { Title, Paragraph, Text } = Typography

export default ({ data, children }) => (
  <MDXProvider
    components={{
      // Map HTML element tag to React component
      h1: (props) => <Title className="bear-title" level={1} {...props} />,
      h2: (props) => <Title className="bear-title" level={2} {...props} />,
      h3: (props) => <Title className="bear-title" level={3} {...props} />,
      h4: (props) => <Title className="bear-title" level={4} {...props} />,
      p: (props) => <Paragraph {...props} />,
      strong: (props) => <Text strong {...props} />,
      delete: (props) => <Text delete {...props} />,
      hr: Divider,
    }}
  >
    <div>
      <HeaderLayout />
      <main className="bear-contianer">
        <SiderbarLayout />
        <div className="bear-content">
          {children || <MDXRenderer>{data.mdx.body}</MDXRenderer>}
        </div>
      </main>
    </div>
  </MDXProvider>
)

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
    }
  }
`
