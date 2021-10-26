import styles from "../styles/Footer.module.css";

export default function Footer(props) {
  return (
    <div
      {...{
        ...props,
        className: `${props.className} ${styles.container}`,
      }}
    ></div>
  );
}
