/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import logoYunuki from "../../assets/yunuki-logo.png";
import AuthService from "../../auth/services/auth.service.ts";

export function Navbar() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AuthService.getUser();
        setUsername(user.username);
      } catch (e) {
        console.error("Usuario no encontrado", e);
      }
    };
    fetchData();
  });

  const [username, setUsername] = useState("");

  return (
    <nav
      className="navbar is-white has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="http://localhost:3001/">
          <img src={logoYunuki} width="112" height="28" />
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
            <p className="mr-3 has-text-weight-semibold">{username ?? ""}</p>
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
