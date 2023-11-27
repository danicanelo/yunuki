import React from "react";
import { useNavigate } from "react-router-dom";
import createYunukiService from "./auth/services/createYunuki.service.ts";
import { Input } from "./core/components/input";
import { YunukiTypeMsg } from "./core/components/message";
import { Navbar } from "./core/components/navbar";
import { Select } from "./core/components/select";

export function CreateYunuki() {
  const [values, setValues] = React.useState({
    name: "",
    breed: "",
    color: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      console.log(values);
      const result = await createYunukiService.createYunuki(
        values.name,
        values.breed,
        values.color
      );
      if (result) {
        console.log(values);
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
    <div>
      <Navbar />
      <div className="section">
        <div className="container">
          <div className="box mx-6">
            <p className="title has-text-centered">
              ¡Bienvenido/a, Nombre de Usuario!
            </p>
            <p className="subtitle has-text-centered">
              Crea tu Yunuki a continuación
            </p>
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
              <button type="submit" className="button is-success">
                ¡Crear Yunuki!
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
