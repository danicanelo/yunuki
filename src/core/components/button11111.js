const buttonTypes = {
  Info: "button is-info ",
  Warning: "button is-warning ",
  Danger: "button is-danger ",
  Success: "button is-success ",
};
export function Button({ type, children, styles }) {
  return (
    <button className={`${buttonTypes[type]}${styles}`} type="button">
      {children}
    </button>
  );
}
