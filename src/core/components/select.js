export function Select({ label, id, values }) {
  return (
    <div className="field">
      <label className="label" htmlFor="{id}">
        {label}
      </label>
      <div className="select">
        <select id={id} name={id}>
          {values.map((value, index) => (
            <option key={index}>{value}</option>
          ))}
          ;
        </select>
      </div>
    </div>
  );
}
