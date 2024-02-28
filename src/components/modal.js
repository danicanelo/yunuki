export function Modal({ isOpen, onClose, yunukiName, action }) {
  return (
    <>
      {isOpen && (
        <div className="modal is-active action-styles">
          <div className="modal-background" onClick={onClose}></div>
          <div className="modal-content">
            <div className="box">
              <p>¡{yunukiName} {action}!</p>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={onClose}
          ></button>
        </div>
      )}
    </>
  );
}
