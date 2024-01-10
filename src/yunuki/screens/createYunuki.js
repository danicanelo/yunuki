import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../auth/services/auth.service.ts";
import { Input } from "../../core/components/input.js";
import { YunukiTypeMsg } from "../../core/components/message.js";
import { Navbar } from "../../core/components/navbar.js";
import createYunukiService from "../services/createYunuki.service.ts";

// Componente que renderizará la interfaz de creación del yunuki
export function CreateYunuki() {
  // Uso de useEffect (cuyo funcionamiento se detalla en yunukiStage.js) para pedirle al servidor el usuario y las razas de yunuki.
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Hace uso de los servicios correspondientes para obtener el usuario y las razas, posteriormente los setea mediante useState en las variables declaradas más abajo
        const user = await AuthService.getUser();
        const breeds = await createYunukiService.getBreeds();
        setBreeds(breeds);
        setUsername(user.username);
        setSelectedBreed(0);
        // Obtenido el usuario, podemos hacer uso de sus propiedades para averiguar si tiene un yunuki vivo (situación en la que no debería estar en la página de creación de yunuki). Si es así lo redireccionamos a la interfaz de cuidado del yunuki. Para averiguar esto simplemente revisamos, con el método find, si existe algún yunuki cuyo campo 'dead' sea nulo, dado que eso quiere decir que aún no ha fallecido.
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

  // Variable para setear el nombre de usuario
  const [username, setUsername] = useState("");

  // Variable para setear las razas
  const [breeds, setBreeds] = useState([]);

  // Variable para setear la raza seleccionada
  const [selectedBreed, setSelectedBreed] = useState();

  // Variable para setear nombre del yunuki y su número de raza
  const [createValues, setCreateValues] = useState({
    yunukiname: "",
    breed: 0,
  });

  const navigate = useNavigate();

  // Esta función se invoca al hacer clic en Submit, se detalla su funcionamiento en login.js
  async function handleSubmit(evt) {
    // Prevenimos el comportamiento por defecto de submit
    evt.preventDefault();
    try {
      // Utilizamos el método dispuesto en createYunukiService para crear un yunuki y lo almacenamos en result. Recibe los parámetros almacenados en createValues. Si los datos introducidos son adecuados el yunuki se crea y navegamos a la interfaz de cuidados. Si no lo son, se lanza un mensaje de advertencia y se permanece en la página. Todo esto se controla mediante un try catch, si algo fallase con el servidor queda capturado en el catch y se informa de ello.
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

  // La función handleChange se ejecuta en cualquier momento en el que el elemento que contenga la llamada a la función sufra modificaciones del tipo que sea. Recibe como parámetro el evento.
  function handleChange(evt) {
    // Extraemos el target y, de éste, las propiedades name y value
    const { target } = evt;
    const { name, value } = target;
    // Mediante el spread operator creamos un objeto newValues que contendrá todos los values actuales y los sustituirá por los recibidos
    const newValues = {
      ...createValues,
      [name]: value,
    };
    // console.log(createValues);
    setCreateValues(newValues);
    // console.log(createValues);
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
