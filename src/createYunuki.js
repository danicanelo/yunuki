import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "./auth/services/auth.service.ts";
import createYunukiService from "./auth/services/createYunuki.service.ts";
import { Input } from "./core/components/input";
import { YunukiTypeMsg } from "./core/components/message";
import { Navbar } from "./core/components/navbar";
import { Select } from "./core/components/select";

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
      console.log(values);
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
                label="Selecciona un tipo de Yunuki"
                id="breed"
                values={["Yanaka", "Yonoko", "Yiniki"]}
                onChange={handleChange}
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
