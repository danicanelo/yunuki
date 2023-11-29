import React from "react";
import AuthService from "./auth/services/auth.service.ts";
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
  /**
   * Lógica que obtenga el yunuki actual del usuario logeado para utilizar sus valores (nombre, hambre, cansancio, etc.)
   */
  const [yunukiName, setYunukiName] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AuthService.getUser();
        console.log(user.username);
        const yunuki = await YunukiService.getYunuki(user.username);
        console.log(yunuki);
        console.log(yunuki.name);
        setYunukiName(yunuki.name);
      } catch (e) {
        console.error("Usuario no encontrado", e);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="hero">
        <div className="columns">
          <div className="fondo2 column is-one-quarter p-6">
            <p className="title">{yunukiName ?? ""}</p>
            <div>
              <ProgressBar label="Hambre" value="10" />
              <ProgressBar label="Suciedad" value="5" />
              <ProgressBar label="Sueño" value="58" />
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
