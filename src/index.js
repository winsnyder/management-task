import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "antd/dist/antd.min.css";
import RouterSystem from "../src/routers";
import { BaseContextProvider } from "./hooks";

ReactDOM.render(
  <BaseContextProvider>
    <Router>
      <RouterSystem />
    </Router>
  </BaseContextProvider>,
  document.getElementById("root")
);
