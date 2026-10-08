import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';

const ChatWindow = () => {
    const [messages, setMessages] = useState([
        'Hi there!',
        'How are you?',
        'What’s going on?',
    ]);

    const chatRef = useRef(null);

    // Scroll to bottom when messages change
    useLayoutEffect(() => {
    //    useEffect(() => {
        chatRef.current.scrollIntoView();
        const chatElement = chatRef.current;
        if (chatElement) {
            chatElement.scrollTop = chatElement.scrollHeight;
        }
    }, [messages]);


    const addMessage = () => {
        setMessages((prev) => [...prev, 'New message at ' + new Date().toLocaleTimeString()]);
    };

    return (
        <div>
            <div
                ref={chatRef}
                style={{
                    height: '150px',
                    width: '300px',
                    overflowY: 'auto',
                    border: '1px solid gray',
                    padding: '10px',
                }}
            >
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <button onClick={addMessage} style={{ marginTop: '10px' }}>
                Add Message
            </button>
        </div>
    );
};

export default ChatWindow;
