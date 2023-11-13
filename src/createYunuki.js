import React from "react";
import { Button } from "./core/components/button";
import { Input } from "./core/components/input";
import { YunukiTypeMsg } from "./core/components/message";
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
          <YunukiTypeMsg></YunukiTypeMsg>
          <Select
            label="¿De qué color quieres que sea tu Yunuki?"
            values={["Verde", "Rojo", "Azul", "Morado", "Amarillo"]}
          />
          <Button type="Success">¡Crear Yunuki!</Button>
        </form>
      </div>
    </div>
  );
}
