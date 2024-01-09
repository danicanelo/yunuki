// Este componente crea una barra de progreso que indique el nivel de un determinado parámetro del yunuki. Recibe el nombre del parámetro (hambre, suciedad o sueño) y el valor correspondiente

export function ProgressBar({ label, value }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <progress
        className="progress is-primary"
        value={value}
        max="10"
      ></progress>
    </div>
  );
}
