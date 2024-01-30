import React from "react";
import { Card } from "../../components/card";
import { Grave } from "../../components/grave";
import { Navbar } from "../../components/navbar";
import "../css/grave.css";
import YunukiService from "../services/yunuki.service.ts";

// Componente que renderizará el cementerio
export function Cemetery() {
  // Uso de useEffect (cuyo funcionamiento se detalla en yunukiStage.js) para pedirle al servidor todos los yunukis fallecidos y setearlos en deadYunukis. Primero declara la función y después la llama.
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const deadYunukis = await YunukiService.getDeadYunukis();
        setDeadYunukis(deadYunukis);
      } catch (e) {
        console.error("Ningún yunuki fallecido encontrado", e);
      }
    };

    fetchData();
  }, []);

  // Uso de useState para declarar una constante que almacenará los yunukis fallecidos
  const [deadYunukis, setDeadYunukis] = React.useState([]);

  return (
    <div>
      <Navbar />
      <div className="section">
        <div className="columns">
          <div className="column is-one-third">
            <Card
              title="Cementerio de Yunukis"
              content="Este es tu cementerio de Yunukis. Aquí podrás visitar las tumbas de tus yunukis fallecidos."
            />
          </div>
          <div className="columns column is-flex-wrap-wrap is-justify-content-center">
            {deadYunukis.map((deadYunuki) => (
              <Grave
                name={deadYunuki.name}
                birthDate={deadYunuki.birth}
                deadDate={deadYunuki.dead}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
