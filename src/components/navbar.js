/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoYunuki from "../assets/yunuki-logo.png";
import AuthService from "../auth/services/auth.service.ts";

// Este componente genera la barra de navegación.
export function Navbar() {
  // useLocation nos permite conocer la ruta exacta en la que nos encontramos en el momento de invocarlo. useNavigate nos permite navegar por las diferentes rutas.
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Nada más renderizarse el componente, establecemos una función (a la que vamos a llamar inmediatamente desde el mismo useEffect) que se encargue de obtener el nombre de usuario conectado y almacenarlo en 'username'. Si ocurre algún fallo redirecciona a la pantalla de login.
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

  // Esta función se encarga de "desconectar" al usuario que lo solicite mediante el botón dispuesto para ello. Hace uso de la función deleteJwt de AuthService, que se encarga de borrar el jwt almacenado en el navegador del usuario, y redirecciona a la pantalla de login
  function logout() {
    AuthService.deleteJwt();
    navigate("/auth/login");
  }

  // Este useState nos sirve para setear un booleano que varíe según pulsamos el burger-button (en responsive), haremos que cuando sea true se muestre el desplegable, cuando sea false lo esconderá
  const [isActive, setIsActive] = useState(false);

  // Esta función se encarga de modificar el booleano anterior modificando su estado según su valor inicial, si es false pasará a true, y si es true pasará a false
  function handleToggle() {
    setIsActive(!isActive);
  }

  // En la siguiente variable almacenaremos un string que, si isActive es true, contenga la clase de Bulma CSS necesaria para desplegar el navbar, y si isActive es false, contenga un string vacío (es decir, que no aplique la clase)
  let select;

  if (isActive) {
    select = "is-active";
  } else {
    select = "";
  }

  return (
    // Retornamos el JSX que formará el componente
    <nav
      className="navbar is-white has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        {/* Este enlace mostrará el logo de la app que sirva como enlace a la home, que en nuestro caso es además la pantalla de login. Usamos las clases de Bulma CSS procedentes, la dirección a la que debe apuntar el enlace y su imagen */}
        <a className="navbar-item" href="http://localhost:3001/">
          <img src={logoYunuki} width="112" height="28" />
        </a>
        {/* Este enlace muestra el icono para el "menú-hamburguesa", que servirá para desplegar el menú de navegación en responsive. Concatenamos la variable 'select' en sus clases para que, si isActive es true, se concatene la clase 'is-active' y se muestre una cruz en vez de las tres rayas del clásico burger-menu (que dibujan los tres span que contiene inmediatamente debajo) */}
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
      {/* Este div contiene el desplegable que se mostrará si se hace clic en el icono burger, para ello aplica la clase 'is-active' si isActive es true */}
      <div id="navbarBasicExample" className={"navbar-menu " + select}>
        <div className="navbar-start"></div>
        <div className="navbar-end">
          <div className="navbar-item">
            {/* Si la ruta en la que estamos es 'cemetery' significa que necesitamos ofrecer una opción para volver a la interfaz de cuidados del yunuki, por lo que disponemos un enlace para ello */}
            {location.pathname === "/cemetery" && (
              <Link to="/yunuki" className="mr-6">
                Volver a tu Yunuki
              </Link>
            )}
            {/* Y al contrario: si la ruta en la que estamos es 'yunuki' necesitamos ofrecer una opción para poder ir al cementerio, por lo que disponemos un enlace para ello */}
            {location.pathname === "/yunuki" && (
              <Link to="/cemetery" className="mr-6">
                Ir al Cementerio
              </Link>
            )}
            {/* Mostramos el nombre de usuario conectado + un botón que permita cerrar la sesión, haciendo uso de la función que anteriormente hemos construido para ello */}
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
