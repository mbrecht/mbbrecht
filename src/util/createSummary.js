export default {
  equipableWeapon: (data) => {
    const keys = Object.keys(data.equipment.requirements || {});
    const requirement =
      keys.length &&
      `that requires ${keys[0][0] === "a" ? "an" : "a"} ${keys[0]} level of ${
        data.equipment.requirements[keys[0]]
      } to weild`;
    console.log(keys);
    return `The ${data.name} is a ${data.weapon.weapon_type} ${
      requirement ? requirement : ""
    } and has an attack speed of ${data.weapon.attack_speed} ticks.`;
  },
};
