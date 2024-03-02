export function Card({ title, content }) {
  return (
    <div className="card mt-6">
      <header className="card-header">
        <p className="card-header-title">{title}</p>
      </header>
      <div className="card-content">
        <div className="content">{content}</div>
      </div>
    </div>
  );
}
