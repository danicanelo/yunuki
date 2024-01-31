// En este componente creamos un input para la recepción de datos desde formularios. En este caso, condensamos todas las propiedades que el fichero puede recibir en una única instrucción: ...props. Lo que le decimos con esta instrucción es que obtenga todas las propiedades que sean establecidas a la hora de utilizar el componente, de forma que no sea necesario mencionarlas una por una. Posteriormente las utilizamos a conveniencia (como hacemos en este ejemplo con props.id o props.label) o directamente las volcamos de nuevo con ...props, preocupándonos de añadir las propiedades que queramos "dejar fijas", como por ejemplo hacemos en nuestro ejemplo con className, dado que nos interesa que todos los inputs de nuestra aplicación tenga aplicados los mismos estilos.

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
