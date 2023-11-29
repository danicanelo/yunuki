import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoYunuki from "../../assets/yunuki-logo.png";
import { Button } from "../../core/components/button";
import { Input } from "../../core/components/input";
import AuthService from "../services/auth.service.ts";
import YunukiService from "../services/yunuki.service.ts";

export function Login() {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const result = await AuthService.login(values.username, values.password);
      if (result) {
        const yunuki = await YunukiService.getYunuki(values.username);
        if (yunuki.status === 404) {
          navigate("/create-yunuki");
        } else {
          navigate("/yunuki");
        }
      } else {
        alert("Login erróneo");
      }
    } catch (e) {
      alert("patataerror", e);
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
      <img className="m-auto is-block p-6" src={logoYunuki} alt="Yunuki logo" />
      <div className="box mt-6 mx-6">
        <form onSubmit={handleSubmit}>
          <Input
            label="Nombre de usuario"
            id="username"
            type="text"
            placeholder="Introduce tu nombre de usuario"
            value={values.user}
            onChange={handleChange}
          />
          <Input
            label="Contraseña"
            id="password"
            type="password"
            placeholder="Introduce tu contraseña"
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
