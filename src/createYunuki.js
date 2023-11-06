import React from "react";
import { Input } from "./core/components/input";
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
    <div className="container">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <Input
            label="Nombre"
            id="name"
            type="text"
            value={values.name}
            onChange={handleChange}
          />
          <Select
            label="Selecciona un tipo de Yunuki"
            values={["Yanaka", "Yonoko", "Yiniki"]}
          />
          <Select
            label="¿De qué color quieres que sea tu Yunuki?"
            values={["Verde", "Rojo", "Azul", "Morado", "Amarillo"]}
          />
          <button className="is-block button is-info" type="submit">
            ¡Crear Yunuki!
          </button>
        </form>
      </div>
    </div>
  );
}
