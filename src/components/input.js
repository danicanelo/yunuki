export function Input({ ...props }) {
  return (
    <div className="field">
      <label className="label" htmlFor={props.id}>
        {props.label}
      </label>
      <div className="control">
        <input className="input" name={props.id} {...props} />
      </div>
    </div>
  );
}
