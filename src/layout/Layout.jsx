import React from "react";
import { Outlet } from "react-router-dom";
import "./layout.css";

export const Layout = () => {
  return (
    <div className="layout">
      <h1>Tic Tac Toe</h1>
      <Outlet />
    </div>
  );
};
