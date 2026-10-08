import React from 'react';
import ReactDOM from 'react-dom';

const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)', // Dark transparent backdrop
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyle = {
    background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', // ✨ Beautiful gradient
    color: '#222',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
    minWidth: '300px',
    maxWidth: '90%',
    textAlign: 'center',
};

const ModalPortal = ({ children }) => {
    return ReactDOM.createPortal(
        <div style={modalStyle}>
            <div style={modalContentStyle}>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default ModalPortal;
//document.getElementById('modal-root')
//in index.html file have this line to create a div for the portal
//<div id="modal-root"></div> <!-- 👈 For portal -->
