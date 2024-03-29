/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoYunuki from "../assets/yunuki-logo.png";
import AuthService from "../auth/services/auth.service.ts";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AuthService.getUser();
        setUsername(user.username);
      } catch (e) {
        console.error("Usuario no encontrado", e);
        navigate("/auth/login");
      }
    };
    fetchData();
  }, []);

  const [username, setUsername] = useState("");

  function logout() {
    AuthService.deleteJwt();
    navigate("/auth/login");
  }

  const [isActive, setIsActive] = useState(false);

  function handleToggle() {
    setIsActive(!isActive);
  }

  let select;

  if (isActive) {
    select = "is-active";
  } else {
    select = "";
  }

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
          className={"navbar-burger " + select}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={handleToggle}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" className={"navbar-menu " + select}>
        <div className="navbar-start"></div>
        <div className="navbar-end">
          <div className="navbar-item">
            {location.pathname === "/cemetery" && (
              <Link to="/yunuki" className="mr-6">
                Volver a tu Yunuki
              </Link>
            )}
            {location.pathname === "/yunuki" && (
              <Link to="/cemetery" className="mr-6">
                Ir al Cementerio
              </Link>
            )}
            <p className="mr-3 has-text-weight-semibold">{username ?? ""}</p>
            <div className="buttons">
              <a className="button is-info" onClick={() => logout()}>
                Cerrar Sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
