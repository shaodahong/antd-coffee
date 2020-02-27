import React from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./App";

export default function Routers({ children }) {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
}
