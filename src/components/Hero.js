import styles from "../styles/Hero.module.css";
import BodyText from "./BodyText";
import Typography from "./Typography";

export default function Hero(props) {
  return (
    <section
      {...{
        // forwarding props
        ...props,
        className: `${props.className} ${styles.container}`, // add container class
      }}
    >
      <div className={styles.header}>
        <Typography variant="h2" className={styles.title}>
          Michael <strong>Brecht</strong>
        </Typography>
        <Typography variant="h3" className={styles.subtitle}>
          Full Stack Software Engineer
        </Typography>
      </div>
      <BodyText>
        <Typography variant="h4" className={styles.tagline}>
          Building a better internet
        </Typography>
      </BodyText>
    </section>
  );
}
