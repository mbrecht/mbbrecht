import styles from "../styles/BodyText.module.css";

export default function BodyText(props) {
  return (
    <section
      {...{
        ...props,
        className: `${props.className} ${styles.container}`,
      }}
    />
  );
}
