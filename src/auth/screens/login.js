import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoYunuki from "../../assets/yunuki-logo.png";
import AuthService from "../../auth/services/auth.service.ts";
import { Input } from "../../components/input";
import YunukiService from "../../yunuki/services/yunuki.service.ts";

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
        try {
          await YunukiService.getYunuki(values.username);
          navigate("/yunuki");
        } catch (e) {
          navigate("/create-yunuki");
        }
      } else {
        alert("Login erróneo");
      }
    } catch (e) {
      alert("Hay algún problema con el servidor", e);
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
      <div className="box mt-6">
        <form onSubmit={handleSubmit}>
          <Input
            label="Nombre de usuario"
            id="username"
            type="text"
            placeholder="Introduce tu nombre de usuario"
            value={values.username}
            onChange={handleChange}
          />
          <Input
            label="Contraseña"
            id="password"
            type="password"
            placeholder="Introduce tu contraseña"
            value={values.password}
            onChange={handleChange}
          />
          <button type="submit" className="button is-success">
            Entrar
          </button>
        </form>
      </div>
      <div className="mt-6 is-flex is-justify-content-center is-align-items-center">
        <p className="mr-4">¿Aún no tienes cuenta?</p>
        <Link to="/users/register">
          <button type="button" className="button is-info">
            Registrarse
          </button>
        </Link>
      </div>
    </div>
  );
}
