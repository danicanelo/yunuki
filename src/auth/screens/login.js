import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../core/components/button";
import { Input } from "../../core/components/input";

export function Login() {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
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
            label="Email"
            id="email"
            type="email"
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
          <Button type="Success">Entrar</Button>
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
