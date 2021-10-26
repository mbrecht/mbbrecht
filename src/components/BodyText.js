import styles from "../styles/BodyText.module.css";

export default function BodyText(props) {
  return (
    <div
      {...{
        ...props,
        className: `${props.className} ${styles.container}`,
      }}
    />
  );
}
