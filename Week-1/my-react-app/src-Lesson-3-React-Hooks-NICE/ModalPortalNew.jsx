import React from "react";
import ReactDOM from "react-dom";

const ModalPortalNew = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-container">{children}</div>
    </div>,

    document.getElementById("modal-root"),
  );
};

export default ModalPortalNew;
