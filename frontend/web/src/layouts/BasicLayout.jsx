import React from "react";
import BasicMenus from "../components/menus/BasicMenus";
import "./BasicLayout.css";

export default function BasicLayout({ children }) {
  const memberId = sessionStorage.getItem("memberId");
  return (
    <>
      <container>
        <header>
          {memberId && <BasicMenus />}
        </header>
        <main>{children}</main>
        <footer></footer>
      </container>
    </>
  );
}
