import React from "react";
import "./index.css";
import { updateHeight, resetAllData } from "../../utils/functions";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { StateProps } from "../../utils/interfaces";

interface BaseProps {
  state: StateProps;
  setState: Function;
  children: React.ReactNode;
}

const Base = (props: BaseProps) => {
  return (
    <div id="base">
      <div
        id="resete"
        onClick={() => resetAllData(props.state, props.setState)}
      >
        <span>{"resete"}</span>
      </div>
      <Header state={props.state} setState={props.setState} />
      <div id="base-mid" style={{ height: updateHeight() }}>
        <div id="base-mid-center">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Base;
