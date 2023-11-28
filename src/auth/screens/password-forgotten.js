import React from "react";
import { Link } from "react-router-dom";
import logoYunuki from "../../assets/yunuki-logo.png";
import { Button } from "../../core/components/button";
import { Input } from "../../core/components/input";

export function PasswordForgotten() {
  const [values, setValues] = React.useState({
    email: "",
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
    <div className="section">
      <div className="container">
        <img
          className="m-auto is-block p-6"
          src={logoYunuki}
          alt="logo Yunuki"
        />
        <div className="box mt-6 mx-6">
          <form onSubmit={handleSubmit}>
            <Input
              label="Escribe el email con el que te registraste y te enviaremos tu contraseña"
              id="email"
              type="email"
              placeholder="Introduce tu email"
              value={values.email}
              onChange={handleChange}
            />
            <Link to="/create-yunuki">
              <Button type="Info">Solicitar contraseña</Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
