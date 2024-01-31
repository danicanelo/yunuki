import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoYunuki from "../../assets/yunuki-logo.png";
import { Input } from "../../components/input";
import AuthService from "../services/auth.service.ts";

// Hacemos uso de useState para disponer las variables donde se almacenarán los valores de los campos del formulario.
export function Register() {
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  // useNavigate nos permitirá direccionar hacia diferentes rutas.
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    // Al hacer clic en el botón Submit se ejecutan las siguientes instrucciones: la primera de todas previene que se realicen las acciones por defecto, de esta manera manejamos nosotros las acciones a realizar.
    evt.preventDefault();
    try {
      // Haciendo uso de la función register del servicio, a la que le pasamos los valores introducidos en el formulario, almacenamos la respuesta del servidor en result.
      const result = await AuthService.register(
        values.username,
        values.email,
        values.password
      );
      // Si el status de la respuesta es 201 (que significa que el recurso ha sido creado y que, por lo tanto, el usuario se ha registrado con éxito) logeamos directamente al nuevo usuario y lo redirijimos hacia la interfaz de creación del yunuki
      if (result.status === 201) {
        await AuthService.login(values.username, values.password);
        navigate("/create-yunuki");
        // Si la respuesta no es 201 extraemos el error que el servidor haya incluido en la respuesta, lo convertimos a json para poder recorrerlo y lanzamos un alert con el mensaje del error.
      } else {
        const error = await result.json();
        alert(error.message);
      }
      // Si algo falla durante todo este proceso en la conexión al servidor, se captura el error y se lanza un mensaje informando de que algo ha ido mal.
    } catch (e) {
      alert("Hay algún problema con el servidor");
    }
  }

  function handleChange(evt) {
    const { target } = evt;
    const { name, value } = target;
    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
  }

  return (
    <div className="container">
      <img className="m-auto is-block p-6" src={logoYunuki} alt="logo Yunuki" />
      <div className="box mt-6">
        <form onSubmit={handleSubmit}>
          {/* Los únicos cambios que el formulario de registro tiene respecto del de login es la restricción del número de caracteres a la hora de introducir los valores. El mínimo de caracteres que debe contener un nombre es 3, mientras que la contraseña debe tener un mínimo de 6. Email no cuenta con ningún mínimo. Además de esto, se valida desde servidor que ni el nombre introducido ni el mail estén ya registrados en la base de datos, para que no puedan existir usuarios duplicados. */}
          <Input
            minLength={3}
            label="Nombre de usuario"
            id="username"
            type="text"
            value={values.username}
            placeholder="Introduce tu nombre de usuario"
            onChange={handleChange}
          />
          <Input
            label="Email"
            id="email"
            type="email"
            value={values.email}
            placeholder="Introduce tu email"
            onChange={handleChange}
          />
          <Input
            minLength={6}
            label="Contraseña"
            id="password"
            type="password"
            value={values.password}
            placeholder="Introduce tu contraseña"
            onChange={handleChange}
          />
          <button type="submit" className="button is-info">
            Registrarse
          </button>
          <Link to="/login">
            <div className="has-text-centered">
              <a>Volver a Inicio</a>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}
