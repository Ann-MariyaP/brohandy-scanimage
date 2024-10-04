import React from "react";
import "./layout.scss";
import Header from "../components/header/header";
// import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div
          className="container-fluid  layout_Box"
          style={{ position: "absolute" }}
        >
          <div className="row">
            <Header />
          </div>
          <div className="row">{children}</div>
        </div>
      </div>
    </>
  );
}
