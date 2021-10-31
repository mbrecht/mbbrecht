const stringMerge = (a, b) =>
  [a, b].filter((c) => c).reduce((a, b) => a + " " + b, "");

export default function createProps(props = {}, options = {}) {
  const className = stringMerge(props.className, options.className);
  return {
    ...props,
    className,
  };
}
