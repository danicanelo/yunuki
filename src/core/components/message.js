// Este componente crea una tarjeta informativa según la raza de yunuki seleccionada. Recibirá el mensaje con dicha información.

export function YunukiTypeMsg({ msg }) {
  return (
    <article className="message is-primary">
      <div className="message-body">{msg}</div>
    </article>
  );
}
