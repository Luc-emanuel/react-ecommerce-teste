import React from "react";
import { StateProps } from "../../utils/interfaces";
import "./index.css";

interface HeaderProps {
  state: StateProps;
  setState: Function;
}

const Header = (props: HeaderProps) => {
  const selectProduct = (page: string) => {
    props.setState({ page: page, product: 0 });
  };
  return (
    <div id="header">
      <span id="title">{"E-Commerce"}</span>
      {props.state.page === "home" && (
        <div id="add-product" onClick={() => selectProduct("add")}>
          <span id="add-product-text">{"Adicionar"}</span>
        </div>
      )}
    </div>
  );
};

export default Header;
