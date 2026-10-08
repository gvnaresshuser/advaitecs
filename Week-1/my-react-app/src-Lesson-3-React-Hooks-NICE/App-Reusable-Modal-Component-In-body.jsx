import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scroll
    } else {
      document.body.style.overflow = "auto"; // Restore scroll
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
    document.body,
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
When you click the modal content, the click event normally travels 
upward through the DOM. This is called event bubbling.

Think of your structure like this:

modal-overlay
    │
    └── modal-content
            │
            ├── h1
            ├── p
            └── Close button

You have:

<div className="modal-overlay" onClick={onClose}>

So clicking anywhere on the overlay calls:

onClose()

That is intentional because we want:

Click outside the modal → close the modal

The problem

Suppose you click:

<h1>Modal Content</h1>

The click happens on the <h1>, but the event bubbles upward:

h1
 ↓
modal-content
 ↓
modal-overlay
 ↓
onClose()

Therefore, even though you clicked inside the modal, the overlay's:

onClick={onClose}

would execute and close the modal.

That's why we use
onClick={(e) => e.stopPropagation()}

This means:

"Stop this click event from propagating/bubbling to the parent."

So now:

Click inside modal
       ↓
modal-content
       ↓
STOP 🛑
       ↓
modal-overlay ❌
       ↓
onClose() doesn't execute

Therefore:

Clicking outside
modal-overlay
       ↓
onClose()
       ↓
Modal closes
Clicking inside
modal-content
       ↓
stopPropagation()
       ↓
Modal stays open
---------------------------------------------
document.body

Normally, your modal would be rendered somewhere inside:

body
 └── #root
      └── App
           └── Modal
With createPortal

If you do:

ReactDOM.createPortal(
  <Modal />,
  document.body
);

React renders the modal like:

body
├── #root
│    └── App
│         └── ...
│
└── Modal

So yes, the modal is physically placed under <body> rather than inside 
your normal React component's DOM location.
*/
