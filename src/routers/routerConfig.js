import React from "react";
import Member from "../pages/member";
import { UserOutlined, OrderedListOutlined } from "@ant-design/icons";

const RouteConfig = [
  {
    path: "/member",
    component: Member,
    name: "Member",
    icon: <UserOutlined />
  },
  {
    path: "/order",
    component: Member,
    name: "Order",
    icon: <OrderedListOutlined />
  }
];

export default RouteConfig;
