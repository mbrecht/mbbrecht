import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import ItemView from "../../../components/ItemView";
import Typography from "../../../components/Typography";
import styles from "../../../styles/RuneTools.module.css";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const [item, setItem] = useState("");

  useEffect(() => {
    const url = `https://api.osrsbox.com/items/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [id]);

  return (
    <section className={styles.container}>
      {item.id ? <ItemView data={item} /> : <Typography>Loading...</Typography>}
    </section>
  );
}
