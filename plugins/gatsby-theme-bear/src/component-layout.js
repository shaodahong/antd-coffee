/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Typography from 'antd/lib/typography'
import HeaderLayout from './header-layout'
import SiderbarLayout from './siderbar-layout'

const { Title, Paragraph } = Typography

export default ({ data, children, ...parentProps }) => {
  return (
    <div>
      <HeaderLayout />
      <main className="bear-contianer">
        <SiderbarLayout />
        <div className="bear-content">
          {children ? children : <MDXRenderer>{data.mdx.body}</MDXRenderer>}
        </div>
      </main>
    </div>
  )
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
    }
  }
`
