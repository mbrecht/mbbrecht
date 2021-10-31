import createProps from "../util/createProps";
import styles from "../styles/ItemTable.module.css";
import Typography from "./Typography";
import Link from "next/link";
import combineClassNames from "../util/combineClassNames";

export default function ItemTable(props) {
  const { data = [] } = props;
  const keys = ["icon", "name"];

  const renderKeys = (keys) => (
    <tr className={styles.keys}>
      {keys.map((key) => (
        <th className={styles.cell}>{key}</th>
      ))}
    </tr>
  );

  const renderBody = (data) =>
    data.map(({ icon, name, id }) => (
      <tr>
        <td className={styles.cell}>
          <img src={`data:image/jpg;base64, ${icon}`} className={styles.icon} />
        </td>
        <td className={combineClassNames([styles.cell, styles.name])}>
          <Typography>
            <Link href={`/rune_tools/item/${id}`}>{name}</Link>
          </Typography>
        </td>
      </tr>
    ));

  return (
    <table {...createProps(props, { className: styles.container })}>
      <thead>{renderKeys(keys)}</thead>
      <tbody>{renderBody(data)}</tbody>
    </table>
  );
}
