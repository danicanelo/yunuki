import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoYunuki from "../../assets/yunuki-logo.png";
import { Input } from "../../core/components/input";
import AuthService from "../services/auth.service.ts";

// La lógica general de las páginas de formulario se explica en detalle en el fichero login.js, de modo que no repetiremos información detallada innecesaria de aquí en adelante. Para cualquier consulta, acudir a login.js o contactar directamente.

//Hacemos uso de useState para disponer las variables donde se almacenarán los valores de los campos del formulario según vayan cambiando.
export function Register() {
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const result = await AuthService.register(
        values.username,
        values.email,
        values.password
      );
      if (result) {
        await AuthService.login(values.username, values.password);
        navigate("/create-yunuki");
      } else {
        alert("Introduce datos adecuados");
      }
    } catch (e) {
      console.log("Hay algún problema con el servidor", e);
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
          {/* Los únicos cambios que el formulario de registro tiene respecto del de login es la restricción del número de caracteres a la hora de introducir los valores. El mínimo de caracteres que debe contener un nombre es 3, mientras que la contraseña debe tener un mínimo de 6. Email no cuenta con ningún mínimo */}
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
