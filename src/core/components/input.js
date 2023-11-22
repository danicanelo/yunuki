export function Input({ label, id, type, value, onChange, minLength=0 }) {
  return (
    <div className="field">
      <label className="label" htmlFor="{id}">
        {label}
      </label>
      <div className="control">
        <input
          minLength={minLength}
          className="input"
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
