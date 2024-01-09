// En este componente creamos una tumba para los yunukis fallecidos. Recibe el nombre del yunuki, su fecha de nacimiento y su fecha de muerte.

export function Grave({ name, birthDate, deadDate }) {
  return (
    <div className="grave m-5 column is-narrow-desktop">
      <div className="name">{name}</div>
      <div className="detail date">
        Nacido el: <br></br>
        {birthDate}
      </div>
      <div className="detail date">
        Fallecido el: <br></br>
        {deadDate}
      </div>
      <div className="rip">R.I.P.</div>
    </div>
  );
}
