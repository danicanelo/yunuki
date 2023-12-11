export function Grave({ name, deadDate, deadCause }) {
  return (
    <div className="grave m-5 column is-narrow-desktop">
      <div className="name">{name}</div>
      <div className="detail dead-date">
        Fecha de Muerte: <br></br>
        {deadDate}
      </div>
      <div className="detail dead-cause">
        Causa de Muerte: <br></br>
        {deadCause}
      </div>
      <div className="rip">R.I.P.</div>
    </div>
  );
}
