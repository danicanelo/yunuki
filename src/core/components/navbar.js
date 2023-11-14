/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
export function Navbar() {
  return (
    <nav
      className="navbar is-link"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="http://localhost:3001/">
          <img
            src="https://i.postimg.cc/8zZ6M3bW/yunuki-logo.png"
            width="112"
            height="28"
          />
        </a>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start"></div>

        <div className="navbar-end">
          {/* <a className="navbar-item">Home</a>
          <a className="navbar-item">Documentation</a> */}
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Cambiar de usuario</strong>
              </a>
              <a className="button is-light">Cerrar Sesión</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
