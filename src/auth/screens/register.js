import React from "react";
import { Link } from "react-router-dom";
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
    <div className="section">
      <div className="container">
      <img className="m-auto is-block p-6" src="https://i.postimg.cc/8zZ6M3bW/yunuki-logo.png" />
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
              label="Password"
              id="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            <Link to="/create-yunuki">
              <Button type="Info">Registrarse</Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
