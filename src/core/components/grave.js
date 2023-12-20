export function Grave({ name, birthDate, deadDate }) {
  return (
    <div className="grave m-5 column is-narrow-desktop">
      <div className="name">{name}</div>
      <div className="detail dead-date">
        Nacido el: <br></br>
        {birthDate}
      </div>
      <div className="detail dead-cause">
        Fallecido el: <br></br>
        {deadDate}
      </div>
      <div className="rip">R.I.P.</div>
    </div>
  );
}
