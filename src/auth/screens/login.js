import React from "react";
import { Link } from "react-router-dom";
import logoYunuki from "../../assets/yunuki-logo.png";
import { Button } from "../../core/components/button";
import { Input } from "../../core/components/input";
import AuthService from "../services/auth.service.ts";

export function Login() {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    AuthService.login(values.username, values.password);
    // console.log(values);
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
      <img className="m-auto is-block p-6" src={logoYunuki} alt="Yunuki logo" />
      <div className="box mt-6 mx-6">
        <form onSubmit={handleSubmit}>
          <Input
            label="Nombre de usuario"
            id="username"
            type="text"
            value={values.user}
            onChange={handleChange}
          />
          <Input
            label="Contraseña"
            id="password"
            type="password"
            value={values.user}
            onChange={handleChange}
          />
          {/* <Button type="Success">Entrar</Button> */}
          <button type="submit" className="button is-success">
            Entrar
          </button>
        </form>
      </div>
      <Link to="/password-forgotten">
        <div className="has-text-centered">
          <a>¿Olvidaste tu contraseña?</a>
        </div>
      </Link>
      <div className="mt-6 is-flex is-justify-content-center is-align-items-center">
        <p className="mr-4">¿Aún no tienes cuenta?</p>
        <Link to="/users/register">
          <Button type="Info">Registrarse</Button>
        </Link>
      </div>
    </div>
  );
}
