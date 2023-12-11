import React from "react";
import { Card } from "../../core/components/card";
import { Grave } from "../../core/components/grave";
import { Navbar } from "../../core/components/navbar";
import "../css/grave.css";
import DeadYunukiService from "../services/deadYunuki.service.ts";

export function Cemetery() {
  const [deadYunukis, setDeadYunukis] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const deadYunukis = await DeadYunukiService.getDeadYunukis();
        setDeadYunukis(deadYunukis);
      } catch (e) {
        console.error("Ningún Yunuki fallecido encontrado", e);
      }
    };

    fetchData();
  }, []);

  console.log(deadYunukis);

  return (
    <div>
      <Navbar />
      <div className="section">
        <div className="columns">
          <div className="column is-one-third">
            <Card
              title="Cementerio de Yunukis"
              content="Este es tu cementerio de Yunukis. Anim dolore officia excepteur exercitation deserunt deserunt consectetur non mollit laboris ullamco. Laborum consequat aliquip consectetur irure ea. Nisi laboris pariatur deserunt tempor laborum nostrud in pariatur ex nisi commodo."
            />
          </div>
          <div className="columns column is-flex-wrap-wrap is-justify-content-center">
            <Grave name="Dionisio" deadDate="27-09-2023" deadCause="Hambre" />
            <Grave name="Trayectorio" deadDate="27-11-2023" deadCause="Sueño" />
            <Grave name="Segundero" deadDate="06-09-2023" deadCause="Sueño" />
          </div>
        </div>
      </div>
    </div>
  );
}
