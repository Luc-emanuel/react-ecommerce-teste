import React from "react";
import "./index.css";

interface FooterProps {}

const Footer = (props: FooterProps) => {
  return (
    <div id="footer">
      <span>{"© 2023 Lucas Emanuel"}</span>
    </div>
  );
};

export default Footer;
