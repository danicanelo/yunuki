export function ProgressBar({ label, value }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <progress
        className="progress is-primary"
        value={value}
        max="100"
      ></progress>
    </div>
  );
}
