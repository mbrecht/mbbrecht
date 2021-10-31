import React from "react";
import styles from "../styles/Typography.module.css";
import createProps from "../util/createProps";

export default function Typography(props) {
  // create new component based on props variant. TODO: convert to TS and create type safe variants
  return React.createElement(
    props.variant || "p",
    createProps(props, { className: styles.typography })
  );
}
