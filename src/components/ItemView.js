// Item view for rune tools

import createProps from "../util/createProps";
import Typography from "./Typography";
import styles from "../styles/ItemView.module.css";
import capitalizeString from "../util/capitalizeString";

const InfoData = ({ name, value }) => (
  <div className={styles.infoData}>
    <Typography className={styles.infoDataName}>{name}</Typography>
    <Typography className={styles.infoDataValue}>{value}</Typography>
  </div>
);

const InfoSection = ({ name, keys = [], data }) => {
  return (
    <div className={styles.infoSection}>
      <Typography className={styles.infoHeader}>
        {capitalizeString(name)}
      </Typography>
      {keys.map((key) => (
        <InfoData
          name={capitalizeString(key)}
          value={capitalizeString(new String(data[key]))}
          key={key}
        />
      ))}
    </div>
  );
};

const InfoHeader = ({ data }) => (
  <div className={styles.infoSection}>
    <Typography className={styles.infoHeader}>{data.name}</Typography>
    <img className={styles.icon} src={`data:image/jpg;base64, ${data.icon}`} />
    {/* <InfoData name="Released" value={data.released_date} /> */}
    <InfoData
      name="Released"
      value={new Date(data.release_date).toLocaleDateString()}
    />
    <InfoData name="Members Item" value={data.members ? "True" : "False"} />
    <InfoData name="Quest Item" value={data.quest_item ? "True" : "False"} />
  </div>
);

const InfoPanel = (props) => {
  const { data } = props;
  return (
    <section {...createProps(props, { className: styles.infoPanel })}>
      <InfoSection
        name={data.name}
        keys={["released", "members", "quest_item"]}
        data={data}
      />
      <InfoSection
        name="properties"
        keys={["tradeable", "equipable", "stackable", "examine"]}
        data={data}
      />
      <InfoSection
        name="values"
        keys={["cost", "highalch", "lowalch", "weight"]}
        data={data}
      />
    </section>
  );
};

export default function ItemView(props) {
  const { data } = props;

  return (
    <section {...createProps(props, { className: styles.container })}>
      <div className={styles.body}>
        <div className={styles.headline}>
          <img
            src={`data:image/jpg;base64, ${data.icon}`}
            alt={`icon for ${data.name}`}
          />
          <Typography>{data.name}</Typography>
        </div>
      </div>
      <InfoPanel data={data} />
    </section>
  );
}
