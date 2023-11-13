import React from "react";
import { Button } from "../../core/components/button";
import { Input } from "../../core/components/input";

export function Register() {
  const [values, setValues] = React.useState({
    username: "",
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
            label="Password"
            id="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
          <Button type="Info">Registrarse</Button>
        </form>
      </div>
    </div>
  );
}
