import styles from "../styles/Hero.module.css";
import Typography from "./Typography";

export default function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h2" className={styles.title}>
          Michael Brecht
        </Typography>
        <Typography variant="h3" className={styles.subtitle}>
          Full Stack Software Engineer
        </Typography>
      </div>
    </div>
  );
}
