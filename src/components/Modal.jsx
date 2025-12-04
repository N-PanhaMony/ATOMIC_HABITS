import ReactDOM from "react-dom";

export default function Modal(props) {
  const { showModal, handleCloseModal, title, message } = props;

  if (!showModal) return null;

  return ReactDOM.createPortal(
    <div className="modal-container">

      {/* Underlay */}
      <div className="modal-overlay" onClick={handleCloseModal} />

      {/* Modal Content */}
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="modal-title">{title || "Information"}</h2>
        </div>

        <div className="modal-body">
          <p>{message}</p>
        </div>

        <div className="modal-footer">
          <button className="modal-close-btn" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </div>

    </div>,
    document.getElementById("portal")
  );
}
