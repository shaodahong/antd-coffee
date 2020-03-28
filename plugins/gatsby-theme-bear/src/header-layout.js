/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import './style.less'
import { Menu } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { Link } from '@reach/router'

function HeaderLayout() {
  return (
    <div className="bear-header">
      <h1 className="bear-header-logo">
        <Link to="/">Ant Design Admin</Link>
      </h1>
      <Menu className="bear-header-menu" mode="horizontal">
        <Menu.Item key="github">
          <a href="https://github.com/shaodahong/ant-design-admin">
            <GithubOutlined />
          </a>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default HeaderLayout
