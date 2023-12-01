export function Select({ label, id, values, onChange, placeholder }) {
  return (
    <div className="field">
      <label className="label" htmlFor="{id}">
        {label}
      </label>
      <div className="select">
        <select id={id} name={id} onChange={onChange} placeholder={placeholder}>
          <option key={placeholder} disabled selected>
            {placeholder}
          </option>
          {values.map((value, index) => (
            <option key={index}>{value}</option>
          ))}
          ;
        </select>
      </div>
    </div>
  );
}
