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
  return (
    <div>
      <Navbar />
      <div className="hero">
        <div className="columns">
          <div className="fondo2 column is-one-quarter p-6">
            <p className="title">Nombre de tu Yunuki</p>
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
