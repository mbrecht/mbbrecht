// Item view for rune tools

import createProps from "../util/createProps";
import Typography from "./Typography";
import styles from "../styles/ItemView.module.css";
import capitalizeString from "../util/capitalizeString";
import EquipableWeapon from "./EquipableWeapon";

const InfoData = ({ name, value }) => (
  <div className={styles.infoData}>
    <Typography className={styles.infoDataName}>
      {capitalizeString(new String(name))}
    </Typography>
    <Typography className={styles.infoDataValue}>
      {capitalizeString(new String(value))}
    </Typography>
  </div>
);

const InfoSection = ({ name, children }) => {
  return (
    <div className={styles.infoSection}>
      <Typography className={styles.infoHeader}>
        {capitalizeString(name)}
      </Typography>
      {children}
    </div>
  );
};

const InfoPanel = (props) => {
  const { data } = props;
  return (
    <section {...createProps(props, { className: styles.infoPanel })}>
      <InfoSection name={data.name}>
        <img src={`data:image/jpg;base64, ${data.icon}`} />
        <InfoData
          name="released"
          value={new Date(data.release_date).toLocaleDateString()}
        />
        <InfoData name="members" value={data.members} />
        <InfoData name="quest item" value={data.quest_item} />
      </InfoSection>
      <InfoSection
        name="properties"
        keys={["tradeable", "equipable", "stackable", "examine"]}
        data={data}
      >
        <InfoData name="tradeable" value={data.members} />
        <InfoData name="equipable" value={data.equipable} />
        <InfoData name="stackable" value={data.stackable} />
        <InfoData name="examine" value={data.examine} />
      </InfoSection>
      <InfoSection
        name="values"
        keys={["cost", "highalch", "lowalch", "weight"]}
        data={data}
      >
        <InfoData name="cost" value={data.cost.toLocaleString()} />
        <InfoData name="high alch" value={data.highalch.toLocaleString()} />
        <InfoData name="low alch" value={data.lowalch.toLocaleString()} />
        <InfoData name="weight" value={`${data.weight} kg`} />
      </InfoSection>
    </section>
  );
};

export default function ItemView(props) {
  const { data } = props;

  const renderBody = () => {
    if (data.equipable_weapon) return <EquipableWeapon data={data} />;
    else return <div />;
  };

  return (
    <section {...createProps(props, { className: styles.container })}>
      <div className={styles.body}>{renderBody()}</div>
      <InfoPanel data={data} />
    </section>
  );
}
