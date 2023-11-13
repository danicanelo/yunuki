import React from "react";
import { Link } from "react-router-dom";
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
    console.log(values);
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
      <div className="box">
        <form onSubmit={handleSubmit}>
          <Input
            label="Nombre de usuario"
            id="username"
            type="text"
            value={values.user}
            onChange={handleChange}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            value={values.user}
            onChange={handleChange}
          />
          {/* <Button type="Success">Entrar</Button> */}
          <button type="submit" className="button is-success">Entrar2</button>
        </form>
      </div>
      <div>
        <p>¿Aún no tienes cuenta?</p>
        <Link to="/register">
          <Button type="Info">Registrarse</Button>
        </Link>
      </div>
    </div>
  );
}
