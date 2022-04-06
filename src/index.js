import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "antd/dist/antd.min.css";
import RouterSystem from "../src/routers"

ReactDOM.render(
  <Router>
    <RouterSystem />
  </Router>,
  document.getElementById("root")
);
