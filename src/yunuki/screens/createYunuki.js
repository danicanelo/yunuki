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
        // Hace uso de los servicios correspondientes para obtener el usuario y las razas, posteriormente los setea mediante useState en las variables declaradas más abajo. Además de setear username y breeds, también setea selectedBreed (que nos servirá para almacenar la raza seleccionada) a 0
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

  // Variable para setear el nombre de usuario, indicamos comillas porque contendrá un string
  const [username, setUsername] = useState("");

  // Variable para setear las razas, indicamos corchetes porque contendrá un array
  const [breeds, setBreeds] = useState([]);

  // Variable para setear la raza seleccionada, dejamos el paréntesis vacío porque contendrá un número que no necesita valor inicial
  const [selectedBreed, setSelectedBreed] = useState();

  // Variable para setear nombre del yunuki y su número de raza (seteamos la raza a 1 para que se muestre Yanaka como primera opción del desplegable)
  const [createValues, setCreateValues] = useState({
    yunukiname: "",
    breed: 1,
  });

  console.log(createValues);

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
        alert("Introduce un nombre para tu yunuki");
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
    // Mediante el spread operator creamos un objeto newValues que contendrá los createValues actuales y los modificará con los nuevos valores
    const newValues = {
      ...createValues,
      [name]: value,
    };
    // Seteamos createValues con newValues
    console.log(newValues);
    setCreateValues(newValues);
    console.log(newValues);
    // Seteamos selectedBreed al valor almacenado en newValues.breed. Le restamos uno para que, al recorrer el array de breeds, coincida con el orden correcto
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
                {/* Para el desplegable, mapeamos el array de breeds y, por cada uno recorrido, generamos un elemento html option con su id como value e imprimimos su nombre en pantalla */}
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
              {/* Utilizamos nuestro componente YunukiTypeMsg para imprimir la info relativa a la raza seleccionada en el desplegable. Es aquí donde se hace uso de selectedBreed, que nos sirve como índice para la posición del array breeds de la que queremos extraer información. Las && forman parte de una sintaxis que nos permite hacer lo siguiente: evalua lo que hay antes de las && y, si se cumple, entonces ejecuta las instrucciones tras las &&. Si no no. */}
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
