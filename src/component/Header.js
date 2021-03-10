import React from "react";
import banner from "../img/duke_ece.PNG";
import "./Header.css";

function Header() {
  return (
    <header>
      <img src={banner} alt="duke ece banner" />
    </header>
  );
}

export default Header;
