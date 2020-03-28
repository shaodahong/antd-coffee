/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Menu from 'antd/lib/menu'
import { Link, useLocation } from '@reach/router'

export default function SiderbarLayout(props) {
  const data = useStaticQuery(graphql`
    {
      allMdx(sort: { fields: fields___slug }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const { pathname } = useLocation()

  return (
    <div className="bear-siderbar">
      <Menu selectedKeys={[pathname]} className="bear-siderbar-menu">
        {data.allMdx.edges.map((edge) => {
          const path = `/components${edge.node.fields.slug}`
          return (
            <Menu.Item key={path}>
              <Link to={path}>
                {edge.node.fields.slug
                  .replace(/\//g, '')
                  .replace(/(\-|^)([a-z])/gi, (match, $1, $2) =>
                    $2.toUpperCase()
                  )}
              </Link>
            </Menu.Item>
          )
        })}
      </Menu>
    </div>
  )
}
