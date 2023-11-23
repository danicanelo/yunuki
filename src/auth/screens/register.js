import React from "react";
import { useNavigate } from "react-router-dom";
import logoYunuki from "../../assets/yunuki-logo.png";
import { Input } from "../../core/components/input";
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
      if (result) {
        navigate("/create-yunuki");
      } else {
        alert("Introduce datos adecuados");
      }
    } catch (e) {
      console.log("patataerror", e);
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
      <div className="box mt-6 mx-6">
        <form onSubmit={handleSubmit}>
          <Input
            minLength={4}
            label="Nombre de usuario"
            id="username"
            type="text"
            value={values.username}
            onChange={handleChange}
          />
          <Input
            minLength={1}
            label="Email"
            id="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
          <Input
            minLength={6}
            label="Contraseña"
            id="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
          <button type="submit" className="button is-info">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
