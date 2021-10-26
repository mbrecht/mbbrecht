import styles from "../styles/Layout.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout(props) {
  const fProps = { ...props }; // props to be forwarded to div
  fProps.className = `${props.className} ${styles.container}`;
  delete fProps.children;

  return (
    <div {...fProps}>
      <Navbar />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
}
