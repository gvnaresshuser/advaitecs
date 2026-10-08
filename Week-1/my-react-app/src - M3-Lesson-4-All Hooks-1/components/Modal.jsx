import React, { forwardRef, useImperativeHandle, useState } from 'react';

const Modal = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const test = () =>{alert("TEST")};

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => {
            alert("CLOSE");
            setIsOpen(false);
        },
        toggle: () => {
            alert("TOGGLE");
            setIsOpen(prev => !prev);
        },
        myFunction: () => {
            alert('This is my function!');
            setIsOpen(true);
        },
    }));

    const styles = {
        overlay: {
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modal: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            minWidth: '300px',
        },
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={() => setIsOpen(false)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2>{props.title || 'Modal Title'}</h2>
                <p>{props.children || 'This is a modal!'}</p>
                <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
        </div>
    );
});

export default Modal;
