import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bathLogo from "../../assets/bath.svg";
import foodLogo from "../../assets/food.svg";
import sleepLogo from "../../assets/sleep.svg";
import { Card } from "../../components/card.js";
import { Modal } from "../../components/modal.js";
import { Navbar } from "../../components/navbar.js";
import { ProgressBar } from "../../components/progress-bar.js";
import { Yunuki } from "../../components/yunuki.js";
import "../css/yunuki.css";
import YunukiService from "../services/yunuki.service.ts";

export function YunukiStage() {
  React.useEffect(function () {
    fetchYunukiData();
    const interval = setInterval(function () {
      fetchYunukiData();
    }, 20000);
    setFetchInterval(interval);
    return function () {
      clearInterval(fetchInterval);
    };
  }, []);

  const [yunuki, setYunuki] = useState();
  const [fetchInterval, setFetchInterval] = useState();
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState("");
  const toggleModal = () => {
    setModal(!modal);
  };

  const navigate = useNavigate();

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

  async function fetchYunukiData() {
    try {
      const yunuki = await YunukiService.getYunuki();
      setYunuki(yunuki);
    } catch (e) {
      console.error("Yunuki no encontrado", e);
      navigate("/create-yunuki");
    }
  }

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
          <div className="aside-background column is-one-quarter p-6">
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
              content={`Las barras muestran el nivel de hambre, suciedad y sueño de ${yunuki.name}. Si alguna llega a su tope fallecerá ¡Trata de no olvidarte de sus necesidades!`}
            />
          </div>
          <div className="is-fullheight column hero is-flex-direction-column is-justify-content-space-evenly">
            <Yunuki yunuki={yunuki} />
            <div className="is-flex is-justify-content-center">
              <button
                className="button is-info mx-2"
                onClick={() => {
                  if (yunuki.hunger === 0) {
                    setAction("no tiene hambre");
                  } else if (yunuki.hunger > 0) {
                    setAction("ha comido");
                  }
                  feedYunuki();
                  toggleModal();
                }}
              >
                <img className="fa-personal-icon" src={foodLogo} />
                Alimentar
              </button>

              <button
                className="button is-info mx-2"
                onClick={() => {
                  if (yunuki.dirt === 0) {
                    setAction("no necesita bañarse");
                  } else if (yunuki.dirt > 0) {
                    setAction("se ha dado un baño");
                  }
                  cleanYunuki();
                  toggleModal();
                }}
              >
                <img className="fa-personal-icon" src={bathLogo} />
                Limpiar
              </button>
              <button
                className="button is-info mx-2"
                onClick={() => {
                  if (yunuki.tiredness === 0) {
                    setAction("no necesita dormir");
                  } else if (yunuki.tiredness > 0) {
                    setAction("ha descansado");
                  }
                  sleepYunuki();
                  toggleModal();
                }}
              >
                <img className="fa-personal-icon" src={sleepLogo} />
                Dormir
              </button>
              <Modal
                isOpen={modal}
                onClose={toggleModal}
                yunukiName={yunuki.name}
                action={action}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
