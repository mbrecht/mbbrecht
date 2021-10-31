import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import Typography from "../components/Typography";
import { useState, useEffect } from "react";
import { Router, useRouter } from "next/dist/client/router";

export default function Navbar(props) {
  const sections = ["home", "projects", "about"];

  const [isActive, setisActive] = useState(
    sections.reduce((obj, name) => {
      return {
        ...obj,
        [name]: false,
      };
    }, {})
  );

  const renderSection = (section, i) => {
    return (
      <div
        key={i}
        onClick={() =>
          setisActive(
            sections.reduce((obj, name) => {
              return {
                ...obj,
                [name]: name === section, // true for section being clicked
              };
            }, {})
          )
        }
      >
        <Typography
          className={`${styles.section} ${isActive[section] && styles.active}`}
        >
          <Link href={`/#${section}`}>{section}</Link>
        </Typography>
      </div>
    );
  };

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setisActive(
        sections.reduce((obj, name) => {
          return {
            ...obj,
            [name]: false, // true for section being clicked
          };
        }, {})
      );
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <header
      {...{
        ...props,
        className: `${props.className} ${styles.container}`,
      }}
    >
      <ul className={styles.sections}>{sections.map(renderSection)}</ul>
    </header>
  );
}
