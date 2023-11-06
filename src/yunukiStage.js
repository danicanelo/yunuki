import { Button } from "./core/components/button";
import { ProgressBar } from "./core/components/progress-bar";

export function YunukiStage() {
  return (
    <div className="container">
      <div className="columns">
        <div className="lateral column is-one-quarter">
          <ProgressBar label="Hambre" value="10" />
          <ProgressBar label="Aburrimiento" value="20" />
          <ProgressBar label="Suciedad" value="5" />
          <ProgressBar label="Sueño" value="58" />
        </div>
        <div className="main column">
          <div className="tamagotchi">
            <div className="eye left"></div>
            <div className="eye right"></div>
            <div className="mouth"></div>
            <div className="leg left"></div>
            <div className="leg right"></div>
          </div>
          <div className=" is-flex flex-direction:row is-justify-content-space-evenly">
            <Button action="Alimentar" />
            <Button action="Jugar" />
            <Button action="Limpiar" />
            <Button action="Dormir" />
          </div>
        </div>
      </div>
    </div>
  );
}
