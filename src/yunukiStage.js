import React from "react";
import YunukiService from "./auth/services/yunuki.service.ts";
import { Button } from "./core/components/button";
import { Card } from "./core/components/card";
import { Navbar } from "./core/components/navbar";
import { ProgressBar } from "./core/components/progress-bar";
import { Yunuki } from "./core/components/yunuki";
import "./core/components/yunuki.css";

const YunukiStageStyles = {
  ButtonStyle: "mx-5",
};
export function YunukiStage() {
  const [yunuki, setYunuki] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const yunuki = await YunukiService.getYunuki();
        setYunuki(yunuki);
      } catch (e) {
        console.error("Yunuki no encontrado", e);
      }
    };

    fetchData();
  }, []);

  if (!yunuki) {
    return (
      <div>
        <Navbar />
        <div>Cargando...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="hero">
        <div className="columns">
          <div className="fondo2 column is-one-quarter p-6">
            <p className="title">{yunuki.name ?? ""}</p>
            <div>
              <ProgressBar label="Hambre" value={yunuki.hunger} />
              <ProgressBar label="Suciedad" value={yunuki.dirt} />
              <ProgressBar label="Sueño" value={yunuki.tiredness} />
            </div>
            <Card
              title="¿Cómo funciona?"
              content="Quis sint sunt velit Lorem ut amet."
            />
          </div>
          <div className="fondo1 is-fullheight column hero is-flex-direction-column is-justify-content-space-around">
            <Yunuki />
            <div className="is-flex is-justify-content-center">
              <Button type="Info" styles={YunukiStageStyles.ButtonStyle}>
                Alimentar
              </Button>
              <Button type="Info" styles={YunukiStageStyles.ButtonStyle}>
                Limpiar
              </Button>
              <Button type="Info" styles={YunukiStageStyles.ButtonStyle}>
                Dormir
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
