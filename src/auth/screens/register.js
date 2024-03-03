import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoYunuki from "../../assets/yunuki-logo.png";
import { Input } from "../../components/input";
import AuthService from "../services/auth.service.ts";

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
      if (result.status === 201) {
        await AuthService.login(values.username, values.password);
        navigate("/create-yunuki");
      } else {
        const error = await result.json();
        alert(error.message);
      }
    } catch (e) {
      alert("Hay algún problema con el servidor");
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
