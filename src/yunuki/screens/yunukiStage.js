import React from "react";
import { Card } from "../../core/components/card.js";
import { Navbar } from "../../core/components/navbar.js";
import { ProgressBar } from "../../core/components/progress-bar.js";
import "../css/yunuki-sleeping.css";
import { Yunuki } from "../js/yunuki.js";
import YunukiService from "../services/yunuki.service.ts";

export function YunukiStage() {
  const [yunuki, setYunuki] = React.useState();
  const [fetchInterval, setFetchInterval] = React.useState();

  async function feedYunuki() {
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

  const fetchYunukiData = async () => {
    try {
      const yunuki = await YunukiService.getYunuki();
      setYunuki(yunuki);
    } catch (e) {
      console.error("Yunuki no encontrado", e);
    }
  };

  React.useEffect(() => {
    fetchYunukiData();
    const interval = setInterval(() => {
      fetchYunukiData();
    }, 30000);
    setFetchInterval(interval);
    return () => {
      clearInterval(fetchInterval);
    };
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
              <button
                className="button is-info mx-5"
                onClick={() => feedYunuki()}
              >
                Alimentar
              </button>
              <button
                className="button is-info mx-5"
                onClick={() => cleanYunuki()}
              >
                Limpiar
              </button>
              <button
                className="button is-info mx-5"
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
