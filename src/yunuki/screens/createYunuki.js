import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../auth/services/auth.service.ts";
import { Input } from "../../components/input.js";
import { YunukiTypeMsg } from "../../components/message.js";
import { Navbar } from "../../components/navbar.js";
import YunukiService from "../services/yunuki.service.ts";

export function CreateYunuki() {
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AuthService.getUser();
        const breeds = await YunukiService.getBreeds();
        setBreeds(breeds);
        setUsername(user.username);
        setSelectedBreed(0);
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

  const [selectedBreed, setSelectedBreed] = useState();

  const [createValues, setCreateValues] = useState({
    yunukiname: "",
    breed: 1,
  });

  console.log(createValues);

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const result = await YunukiService.createYunuki(
        createValues.yunukiname,
        createValues.breed
      );
      if (result) {
        navigate("/yunuki");
      } else {
        alert("Introduce un nombre para tu yunuki");
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
    console.log(newValues);
    setCreateValues(newValues);
    console.log(newValues);
    setSelectedBreed(newValues.breed - 1);
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
