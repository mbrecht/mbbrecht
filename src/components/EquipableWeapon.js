import createProps from "../util/createProps";
import styles from "../styles/EquipableWeapon.module.css";
import Typography from "./Typography";
import createSummary from "../util/createSummary";
import capitalizeString from "../util/capitalizeString";

const Stats = ({ equipment }) => {
  const children = Object.entries(equipment).map(([key, val], i) => {
    const name = capitalizeString(key.replace("_", " "));
    return (
      <div key={i} className={styles.equipment}>
        <Typography>{name}</Typography>
        <Typography>{val}</Typography>
      </div>
    );
  });
  return (
    <div className={styles.equipmentStats}>
      <Typography variant="h2">Equipment Stats</Typography>
      <div className={styles.equipmentContainer}>{children}</div>
    </div>
  );
};

export default function EquipableWeapon(props) {
  const { data, ...rest } = props;
  const { requirements, ...restEquipment } = data.equipment;
  return (
    <section {...createProps(rest, { className: styles.container })}>
      <img
        src={`data:image/jpg;base64, ${data.icon}`}
        className={styles.icon}
      />
      <Typography>{createSummary.equipableWeapon(data)}</Typography>
      <Stats equipment={restEquipment} />
    </section>
  );
}
