import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ListProject from "../pages/ListProject";
import BoardView from "../pages/Board";

export default function RouterSystem() {
  return (
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<ListProject />} path="/" />
      <Route element={<BoardView />} path="/board/:projectId" />
    </Routes>
  );
}
