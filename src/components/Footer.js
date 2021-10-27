import styles from "../styles/Footer.module.css";

export default function Footer(props) {
  return (
    <footer
      {...{
        ...props,
        className: `${props.className} ${styles.container}`,
      }}
    />
  );
}
