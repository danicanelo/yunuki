import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../core/components/card.js";
import { Navbar } from "../../core/components/navbar.js";
import { ProgressBar } from "../../core/components/progress-bar.js";
import { Yunuki } from "../../core/components/yunuki.js";
import "../css/yunuki.css";
import YunukiService from "../services/yunuki.service.ts";

// Componente que renderizará la interfaz de cuidado del yunuki
export function YunukiStage() {
  // useEffect es un hook de React usado para ejecutar su contenido inmediatamente después del renderizado del componente. Es decir, el contenido de esta función se ejecutará cuando entremos a esta página (si nada falla en su carga), dado que el componente pretende ser la propia página.
  React.useEffect(function () {
    // Llama a la función fetchYunukiData, que se encarga de evaluar si el usuario tiene un yunuki vivo y, por lo tanto, puede permanecer en esta página. En caso contrario envía al usuario a la página de creación del yunuki. ADemás de eso también setea las propiedades del yunuki según vayan cambiando. Esta función se detalla en su construcción.
    fetchYunukiData();
    // setInterval ejecuta la función que se le indique como primer parámetro cada cierto tiempo, que serán los milisegundos introducidos como segundo parámetro. En este caso la función es fetchYunukiData y el intervalo de tiempo es cada 10000 milisegundos (cada 10 segundos). De esta forma mantenemos actualizados los parámetros del yunuki y nos aseguramos de salir de la interfaz de cuidado si el yunuki muere. El proceso devuelve un "identificador de intervalo" que almacenamos en 'interval' y que nos servirá para setear en fetchInterval el ciclo actual, de modo que podamos finalizarlo con clearInterval
    const interval = setInterval(function () {
      fetchYunukiData();
    }, 10000);
    setFetchInterval(interval);
    return function () {
      clearInterval(fetchInterval);
    };
  }, []);

  // Usos de useState para setear una variable llamada yunuki y otra llamada fetchInterval
  const [yunuki, setYunuki] = React.useState();
  const [fetchInterval, setFetchInterval] = React.useState();

  // Instanciación de useNavigate para poder navegar por diferentes rutas
  const navigate = useNavigate();

  // Función para alimentar a los yunukis
  async function feedYunuki() {
    // Hacemos uso del método feedYunuki del YunukiService y almacenamos el resultado en newYunuki, que utilizaremos para setear yunuki a través de setYunuki. La misma operación se realiza para cleanYunuki y sleepYunuki
    const newYunuki = await YunukiService.feedYunuki();
    setYunuki(newYunuki);
  }

  async function cleanYunuki() {
    const newYunuki = await YunukiService.cleanYunuki();
    setYunuki(newYunuki);
  }

  async function sleepYunuki() {
    const newYunuki = await YunukiService.sleepYunuki();
    setYunuki(newYunuki);
  }

  // Función para evaluar si el usuario tiene un yunuki vivo asociado a través del método getYunuki de YunukiService. Si lo encuentra lo almacena en una variable 'yunuki' y la usa para setear el yunuki del useState. Si falla captura el error y navega automáticamente a create-yunuki, dado que si el usuario no tiene un yunuki vivo asociado significa que necesita crear uno y no debe estar en la interfaz de cuidados
  async function fetchYunukiData() {
    try {
      const yunuki = await YunukiService.getYunuki();
      setYunuki(yunuki);
    } catch (e) {
      console.error("Yunuki no encontrado", e);
      navigate("/create-yunuki");
    }
  }

  // Si a estas alturas del programa el servidor no ha devuelto un yunuki pero tampoco nos ha llevado a otra ruta significa que el proceso está tardando por la razón que sea. Para evitar que se muestre la interfaz mostramos un mensaje de que la aplicación está cargando
  if (!yunuki) {
    return (
      <div>
        <Navbar />
        <div>Cargando...</div>
      </div>
    );
  }

  // Estructura JSX de la página. Ciertos valores (como el nombre del yunuki, su raza o sus parámetros) son obtenidos directamente del objeto yunuki devuelto por el servidor.
  return (
    <div>
      <Navbar />
      <div className="hero">
        <div className="columns">
          <div className="aside-background column is-one-quarter p-6">
            <div className="box">
              <p className="title">{yunuki.name ?? ""}</p>
              <p>Raza: {yunuki.breed.name ?? ""}</p>
            </div>
            <div>
              <ProgressBar label="Hambre" value={yunuki.hunger} />
              <ProgressBar label="Suciedad" value={yunuki.dirt} />
              <ProgressBar label="Sueño" value={yunuki.tiredness} />
            </div>
            <Card
              title="¿Cómo funciona?"
              content={`Las barras muestran el nivel de hambre, suciedad y sueño de ${yunuki.name}. Si alguna llega a su tope fallecerá ¡Trata de no olvidarte de sus necesidades!`}
            />
          </div>
          <div className="is-fullheight column hero is-flex-direction-column is-justify-content-space-evenly">
            <Yunuki yunuki={yunuki} />
            <div className="is-flex is-justify-content-center">
              <button
                className="button is-info mx-2"
                onClick={() => feedYunuki()}
              >
                Alimentar
              </button>
              <button
                className="button is-info mx-2"
                onClick={() => cleanYunuki()}
              >
                Limpiar
              </button>
              <button
                className="button is-info mx-2"
                onClick={() => sleepYunuki()}
              >
                Dormir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
