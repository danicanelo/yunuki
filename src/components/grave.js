export function Grave({ name, birthDate, deadDate }) {
  return (
    <div className="grave m-5 column is-narrow-desktop">
      <div className="name">{name}</div>
      <div className="detail date">
        Nacido el: <br></br>
        {new Date(birthDate).toLocaleDateString()}
      </div>
      <div className="detail date">
        Fallecido el: <br></br>
        {new Date(deadDate).toLocaleDateString()}
      </div>
      <div className="rip">R.I.P.</div>
    </div>
  );
}
