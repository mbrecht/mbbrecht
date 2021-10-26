import { projects } from "../../config";
import Typography from "./Typography";
import styles from "../styles/ProjectList.module.css";
import Link from "next/link";
import Image from "next/image";

const renderProject = ({ title, description, url, img }, i) => {
  return (
    <div
      className={styles.project}
      key={i}
      style={{ backgroundImage: `url(${img}) ` }}
    >
      <div className={styles.overlay}>
        <Link href={url}>
          <Typography variant="h3">{title}</Typography>
        </Link>
      </div>
    </div>
  );
};

export default function ProjectList(props) {
  return (
    <div
      {...{
        // forwarding props
        ...props,
        className: `${props.className} ${styles.container}`, // add container class
      }}
    >
      <Typography variant="h2">Projects I've Built:</Typography>
      <div className={styles.projectContainer}>
        {projects.map(renderProject)}
      </div>
    </div>
  );
}
