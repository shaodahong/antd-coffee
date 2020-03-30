/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import Menu from 'antd/lib/menu'
import { useLocation } from '@reach/router'

function transformToName(slug) {
  const slashedSlug = slug.replace(/\//g, '')
  if (!slashedSlug) {
    return '介绍'
  }
  return slashedSlug.replace(/(-|^)([a-z])/gi, (match, $1, $2) =>
    $2.toUpperCase()
  )
}

export default function SiderbarLayout() {
  const data = useStaticQuery(graphql`
    {
      allMdx(sort: { fields: fields___slug }) {
        edges {
          node {
            fields {
              slug
              route
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
          const { slug, route } = edge.node.fields
          const path = `${route}${slug}`
          return (
            <Menu.Item key={path}>
              <Link to={path}>{transformToName(slug)}</Link>
            </Menu.Item>
          )
        })}
      </Menu>
    </div>
  )
}
