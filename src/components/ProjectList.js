import { projects } from "../../config";
import Typography from "./Typography";
import styles from "../styles/ProjectList.module.css";
import Link from "next/link";

const renderProject = ({ title, url, img }, i) => {
  return (
    <li
      className={styles.project}
      key={i}
      style={{ backgroundImage: `url(${img}) ` }}
    >
      <Link href={url}>
        <div className={styles.overlay}>
          <Typography variant="h3">{title}</Typography>
        </div>
      </Link>
    </li>
  );
};

export default function ProjectList(props) {
  return (
    <section
      {...{
        // forwarding props
        ...props,
        className: `${props.className} ${styles.container}`, // add container class
      }}
    >
      <Typography variant="h2">Projects I've Built:</Typography>
      <ul className={styles.projectContainer}>{projects.map(renderProject)}</ul>
    </section>
  );
}
