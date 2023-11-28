export function YunukiTypeMsg({ type, msg }) {
  return (
    <article className="message is-primary">
      <div className="message-header">
        <p>{type}</p>
      </div>
      <div className="message-body">{msg}</div>
    </article>
  );
}
