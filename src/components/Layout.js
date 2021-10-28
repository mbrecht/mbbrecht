import styles from "../styles/Layout.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout(props) {
  const fProps = { ...props }; // props to be forwarded to div
  fProps.className = `${props.className} ${styles.container}`;
  delete fProps.children;

  return (
    <section {...fProps}>
      {/* Metadata */}
      <Head>
        <title>Michael Brecht | Software Engineer</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <script
          async
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG_ID}`}
        ></script>
        <script defer src="/gtagScript.js"></script>
      </Head>

      {/* Page body */}
      <Navbar />
      <section>{props.children}</section>
      <Footer />
    </section>
  );
}
