export function Select({ label, id, values, onChange }) {
  return (
    <div className="field">
      <label className="label" htmlFor="{id}">
        {label}
      </label>
      <div className="select">
        <select id={id} name={id} onChange={onChange}>
          {values.map((value, index) => (
            <option key={index}>{value}</option>
          ))}
          ;
        </select>
      </div>
    </div>
  );
}
