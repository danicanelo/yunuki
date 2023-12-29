import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../core/components/card.js";
import Modal from "../../core/components/modal.js";
import { Navbar } from "../../core/components/navbar.js";
import { ProgressBar } from "../../core/components/progress-bar.js";
import { Yunuki } from "../../core/components/yunuki.js";
import "../css/animations copy.css";
import YunukiService from "../services/yunuki.service.ts";

export function YunukiStage() {
  const [yunuki, setYunuki] = React.useState();
  const [fetchInterval, setFetchInterval] = React.useState();

  const navigate = useNavigate();

  async function feedYunuki() {
    const newYunuki = await YunukiService.feedYunuki();
    setYunuki(newYunuki);
  }

  /*const feedYunuki = async () => {
    const newYunuki = await YunukiService.feedYunuki();
    setYunuki(newYunuki);
  };*/

  async function cleanYunuki() {
    const newYunuki = await YunukiService.cleanYunuki();
    setYunuki(newYunuki);
  }

  async function sleepYunuki() {
    const newYunuki = await YunukiService.sleepYunuki();
    setYunuki(newYunuki);
  }

  async function fetchYunukiData() {
    try {
      const yunuki = await YunukiService.getYunuki();
      setYunuki(yunuki);
    } catch (e) {
      console.error("Yunuki no encontrado", e);
      navigate("/create-yunuki");
    }
  }

  /*const fetchYunukiData = async () => {
    try {
      const yunuki = await YunukiService.getYunuki();
      setYunuki(yunuki);
    } catch (e) {
      console.error("Yunuki no encontrado", e);
      navigate("/create-yunuki");
    }
  };*/

  React.useEffect(function () {
    fetchYunukiData();
    const interval = setInterval(function () {
      fetchYunukiData();
    }, 30000);
    setFetchInterval(interval);
    return function () {
      clearInterval(fetchInterval);
    };
  }, []);

  // ULTRAPEND
  /*React.useEffect(() => {
    fetchYunukiData();
    const interval = setInterval(() => {
      fetchYunukiData();
    }, 30000);
    setFetchInterval(interval);
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);*/

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
              content="Las barras muestran el nivel de hambre, suciedad y sueño de tu yunuki. Si alguna llega a su tope tu yunuki fallecerá ¡Trata de no olvidarte de sus necesidades!"
            />
          </div>
          <div className="fondo1 is-fullheight column hero is-flex-direction-column is-justify-content-space-evenly">
            <Yunuki yunuki={yunuki} />
            <div className="is-flex is-justify-content-center">
              <Modal />
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
