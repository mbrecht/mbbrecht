import styles from "../styles/Home.module.css";
import Hero from "../components/Hero";
import ProjectList from "../components/ProjectList";
import About from "../components/About";

export default function Home() {
  return (
    <div className={styles.container}>
      <Hero className={styles.hero} id="home" />
      <ProjectList id="projects" />
      <About id="about" />
    </div>
  );
}
