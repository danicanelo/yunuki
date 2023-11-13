const buttonTypes = {
  Info: "button is-info",
  Warning: "button is-warning",
  Danger: "button is-danger",
  Success: "button is-success",
};
export function Button({ type, children }) {
  return (
    <button className={buttonTypes[type]} type="button">
      {children}
    </button>
  );
}
