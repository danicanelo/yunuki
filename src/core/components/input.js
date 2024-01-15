// En este componente creamos un input para la recepción de datos desde formularios. Recibe una label a modo de "título", un identificador que nos sirve tanto para el id como para el name, un tipo de input, un valor que será el valor que contendrá el input, un placeholder, las instrucciones que debe ejecutar al ser modificado y una longitud mínima

export function Input({
  label,
  id,
  type,
  value,
  placeholder,
  onChange,
  minLength = 0,
}) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
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
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
