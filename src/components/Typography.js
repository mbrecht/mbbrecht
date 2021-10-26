import React from "react";
import styles from "../styles/Typography.module.css";

export default function Typography(props) {
  return React.createElement(props.variant, {
    ...props,
    className: `${props.className} ${styles.typography}`, // inject css to all elements
  });
}
