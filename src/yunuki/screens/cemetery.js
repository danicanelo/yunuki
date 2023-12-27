import React from "react";
import { Card } from "../../core/components/card";
import { Grave } from "../../core/components/grave";
import { Navbar } from "../../core/components/navbar";
import "../css/grave.css";
import YunukiService from "../services/yunuki.service.ts";

export function Cemetery() {
  const [deadYunukis, setDeadYunukis] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const deadYunukis = await YunukiService.getDeadYunukis();
        setDeadYunukis(deadYunukis);
      } catch (e) {
        console.error("Ningún Yunuki fallecido encontrado", e);
      }
    };

    fetchData();
  }, []);

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
