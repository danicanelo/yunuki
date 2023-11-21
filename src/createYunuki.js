import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./core/components/button";
import { Input } from "./core/components/input";
import { YunukiTypeMsg } from "./core/components/message";
import { Navbar } from "./core/components/navbar";
import { Select } from "./core/components/select";

export function CreateYunuki() {
  const [values, setValues] = React.useState({
    name: "",
    color: "",
    breed: "",
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
    <div>
      <Navbar />
      <div className="section">
        <div className="container">
          <div className="box mx-6">
            <p className="title has-text-centered">¡Bienvenido/a, Nombre de Usuario!</p>
            <p className="subtitle has-text-centered">Crea tu Yunuki a continuación</p>
            <form onSubmit={handleSubmit}>
              <Input
                label="Nombre para tu Yunuki"
                id="name"
                type="text"
                value={values.name}
                onChange={handleChange}
              />
              <Select
                label="Selecciona un tipo de Yunuki"
                values={["Yanaka", "Yonoko", "Yiniki"]}
              />
              <YunukiTypeMsg></YunukiTypeMsg>
              <Select
                label="¿De qué color quieres que sea tu Yunuki?"
                values={["Verde", "Rojo", "Azul", "Morado", "Amarillo"]}
              />
              <Link to="/yunuki">
                <Button type="Success">¡Crear Yunuki!</Button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
