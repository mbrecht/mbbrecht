import Typography from "../../components/Typography";
import ItemTable from "../../components/ItemTable";
import { useEffect, useState } from "react";
import styles from "../../styles/RuneTools.module.css";

// Abstracted to make Page component more readable
// loads initial items from osrsbox API
const loadItems = (setItems) => () => {
  const url =
    "https://api.osrsbox.com/items?where={%22equipable_weapon%22:true,%22duplicate%22:false}"; // no noted items, only equippable weapons (it's cooler than ammo mould)
  fetch(url)
    .then((res) => res.json())
    .then((data) => setItems(data._items));
};

export default function Page() {
  const [items, setItems] = useState(""); // items currently loaded

  useEffect(loadItems(setItems), []); // load items

  return (
    <div className={styles.container}>
      {items.length ? (
        <ItemTable data={items} />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
}
