import React, { useState } from "react";

export default function Modal() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <button className="" onClick={toggleModal}>
        Open
      </button>
      {modal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={toggleModal}></div>
          <div className="modal-content">
            <p>Prueba</p>
          </div>
          <button className="modal-close" aria-label="close"></button>
        </div>
      )}
    </>
  );
}
