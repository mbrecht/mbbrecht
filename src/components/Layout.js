import styles from "../styles/Layout.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout(props) {
  const fProps = { ...props }; // props to be forwarded to div
  fProps.className = `${props.className} ${styles.container}`;
  delete fProps.children;

  return (
    <div {...fProps}>
      <Head>
        <title>Michael Brecht | Software Engineer</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <Navbar />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
}
