import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../auth/services/auth.service.ts";
import { Input } from "../../core/components/input.js";
import { YunukiTypeMsg } from "../../core/components/message.js";
import { Navbar } from "../../core/components/navbar.js";
import { Select } from "../../core/components/select.js";
import createYunukiService from "../services/createYunuki.service.ts";

export function CreateYunuki() {
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AuthService.getUser();
        setUsername(user.username);
      } catch (e) {
        console.error("Usuario no encontrado", e);
      }
    };

    fetchData();
  }, []);

  const [username, setUsername] = React.useState("");

  const [values, setValues] = React.useState({
    name: "",
    breed: "",
    color: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const result = await createYunukiService.createYunuki(
        values.name,
        values.breed,
        values.color
      );
      if (result) {
        navigate("/yunuki");
      } else {
        alert("Introduce datos adecuados");
      }
    } catch (e) {
      console.log("No se puede conectar con el servidor", e);
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
          <div className="box">
            <p className="title has-text-centered">¡Hola, {username ?? ""}!</p>
            <p className="subtitle has-text-centered">
              Crea tu Yunuki a continuación
            </p>
            <form onSubmit={handleSubmit}>
              <Input
                label="Nombre para tu Yunuki"
                id="name"
                type="text"
                placeholder="Introduce un nombre"
                value={values.name}
                onChange={handleChange}
              />
              <Select
                label="Tipo de Yunuki"
                id="breed"
                values={["Yanaka", "Yonoko", "Yiniki"]}
                onChange={handleChange}
                placeholder="Selecciona un tipo de Yunuki"
              />
              <YunukiTypeMsg
                type="Yonoko"
                msg="Los Yonoko son una raza de Yunuki sunt voluptate eiusmod ut aute aute. Irure minim eiusmod non eiusmod et voluptate cillum do irure officia non fugiat mollit. Cillum quis nulla proident ea do cillum. Sint qui aliquip qui culpa irure proident. Id est Lorem ex fugiat labore non anim incididunt commodo tempor reprehenderit est. Culpa amet eu sunt et velit dolore laborum ullamco in tempor elit. Exercitation ipsum mollit irure eu ut eiusmod cupidatat."
              />
              <Select
                label="¿De qué color quieres que sea tu Yunuki?"
                id="color"
                values={["Verde", "Rojo", "Azul", "Morado", "Amarillo"]}
                onChange={handleChange}
                placeholder="Selecciona un color para tu Yunuki"
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
