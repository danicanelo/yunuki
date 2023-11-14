import { Button } from "./core/components/button";
import { Navbar } from "./core/components/navbar";
import { ProgressBar } from "./core/components/progress-bar";

export function YunukiStage() {
  return (
    <div>
      <Navbar />
      <div className="hero is-fullheight is-flex is-justify-content-center">
        <div className="columns">
          <div className="fondo2 column is-one-quarter p-6">
            <ProgressBar label="Hambre" value="10" />
            <ProgressBar label="Aburrimiento" value="20" />
            <ProgressBar label="Suciedad" value="5" />
            <ProgressBar label="Sueño" value="58" />
          </div>
          <div className="fondo1 column hero is-fullheight is-flex-direction-column is-justify-content-space-around">
            <div className="tamagotchi">
              <div className="eye left"></div>
              <div className="eye right"></div>
              <div className="mouth"></div>
              <div className="leg left"></div>
              <div className="leg right"></div>
            </div>
            <div className="is-flex is-justify-content-space-evenly">
              <Button type="Info">Alimentar</Button>
              <Button type="Info">Jugar</Button>
              <Button type="Info">Limpiar</Button>
              <Button type="Info">Dormir</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
