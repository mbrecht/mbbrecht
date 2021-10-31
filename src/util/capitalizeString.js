const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default function capitalizeString(str) {
  return str.split(" ").map(capitalize).join(" ");
}
