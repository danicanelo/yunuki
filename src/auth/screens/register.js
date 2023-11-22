import React from "react";
import { Link } from "react-router-dom";
import logoYunuki from "../../assets/yunuki-logo.png";
import { Input } from "../../core/components/input";
import RegisterService from "../services/register.service.ts";

export function Register() {
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    RegisterService.register(values.username, values.email, values.password);
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
      <div className="box mt-6 mx-6">
        <form onSubmit={handleSubmit}>
          <Input
            label="Nombre de usuario"
            id="username"
            type="text"
            value={values.username}
            onChange={handleChange}
          />
          <Input
            label="Email"
            id="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
          <Input
            label="Contraseña"
            id="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
          <Link to="/create-yunuki">
            <button type="submit" className="button is-info">
              Registrarse
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
