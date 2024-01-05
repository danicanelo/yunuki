import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../auth/services/auth.service.ts";
import { Input } from "../../core/components/input.js";
import { YunukiTypeMsg } from "../../core/components/message.js";
import { Navbar } from "../../core/components/navbar.js";
import createYunukiService from "../services/createYunuki.service.ts";

export function CreateYunuki() {
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AuthService.getUser();
        const breeds = await createYunukiService.getBreeds();
        setBreeds(breeds);
        setUsername(user.username);
        const aliveYunuki = user.yunukis.find(function yunukiAlive(yunuki) {
          return yunuki.dead === null;
        });
        if (aliveYunuki) {
          navigate("/yunuki");
        }
      } catch (e) {
        console.error("Usuario no encontrado", e);
      }
    };

    fetchData();
  }, []);

  const [username, setUsername] = useState("");

  const [breeds, setBreeds] = useState([]);

  const [selectedBreed, setSelectedBreed] = useState(0);

  const [createValues, setCreateValues] = useState({
    yunukiname: "",
    breed: 0,
  });

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const result = await createYunukiService.createYunuki(
        createValues.yunukiname,
        createValues.breed
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
      ...createValues,
      [name]: value,
    };
    console.log(createValues);
    setCreateValues(newValues);
    console.log(createValues);
    setSelectedBreed(newValues.breed - 1);
  }

  /*
  function handleChange(evt) {
   const name = evt.target.name;
   const value = evt.target.value;
   const newValues = {
    ...createValues,
    [name]: value,
   };
  }
  */

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
                id="yunukiname"
                type="text"
                placeholder="Introduce un nombre"
                value={createValues.yunukiname}
                onChange={handleChange}
              />
              <div className="field">
                <label className="label" htmlFor="breed">
                  Tipo de yunuki
                </label>
                <div className="select">
                  <select id="breed" name="breed" onChange={handleChange}>
                    {breeds.map((breed, i) => (
                      <option key={i} value={breed.id}>
                        {breed.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {breeds[selectedBreed] !== undefined && (
                <YunukiTypeMsg msg={breeds[selectedBreed].info} />
              )}

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
