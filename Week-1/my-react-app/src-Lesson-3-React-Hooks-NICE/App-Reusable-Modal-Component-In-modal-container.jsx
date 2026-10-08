import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import "./Modal.css";

//NOTE: FOR THIS TO WORK, YOU MUST ADD A DIV WITH ID "modal" IN index.html
//<div id="modal"></div> <!-- ✅ Dedicated modal container -->

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "auto"; // Restore scroll
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ✅ Render into #modal container instead of document.body
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal"), // ⬅️ Mount inside #modal container - index.html
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1>Modal Content</h1>
        <p>This is the content inside the modal</p>
      </Modal>
    </div>
  );
};

export default App;
/*
overflow: hidden means:
Don't allow the <body> to scroll.
Without this code, the user could potentially scroll the background page behind the modal.

When the modal is closed

When:

isOpen === false

this executes:

document.body.style.overflow = "auto";

That means:

Restore normal scrolling of the page.

So:

Modal opens
     ↓
overflow = hidden
     ↓
Background cannot scroll


Modal closes
     ↓
overflow = auto
     ↓
Background can scroll again
--------------------------------------
Now the second line

This is completely different:

if (!isOpen) return null;

This means:

If the modal isn't open, don't render anything from the Modal component.

Remember:

!isOpen

means:

isOpen === false

Therefore:

if (!isOpen) return null;

means:

If modal is closed
       ↓
return null
       ↓
Modal renders nothing
*/
