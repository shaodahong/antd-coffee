import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined, OrderedListOutlined } from "@ant-design/icons";
import Routers from ".";
import { Route, useLocation, Link } from "react-router-dom";
import RouterConfig from "./routerConfig";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  console.log(useLocation());

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          {RouterConfig.map(({ name, icon, path }) => (
            <Menu.Item key={path}>
              {icon}
              <Link to={path}>{name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360 }}>
            {RouterConfig.map(({ path, component }) => (
              <Route key={path} path={path} component={component} />
            ))}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
