import React from "react";
import styles from "../styles/Typography.module.css";

export default function Typography(props) {
  // create new component based on props variant. TODO: convert to TS and create type safe variants
  return React.createElement(props.variant, {
    ...props, // forwarding props
    className: `${props.className} ${styles.typography}`, // inject css to all elements
  });
}
