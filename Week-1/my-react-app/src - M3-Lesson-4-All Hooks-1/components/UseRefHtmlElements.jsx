import React, { useRef, useEffect } from 'react';

function UseRefHtmlElements() {
    const inputRef = useRef();
    const textAreaRef = useRef();
    const buttonRef = useRef();
    const divRef = useRef();
    const videoRef = useRef();
    const selectRef = useRef();

    // Input Focus on Load
    //React.useEffect(() => {
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleSelectTextArea = () => {
        textAreaRef.current.focus();
        textAreaRef.current.select();
    };

    const handleTriggerButtonClick = () => {
        buttonRef.current.click();
    };

    const handleRealButtonClick = () => {
        alert('Button was clicked!');
    };

    const changeDivStyle = () => {
        divRef.current.style.backgroundColor = 'lightgreen';
        divRef.current.style.padding = '20px';
    };

    const playVideo = () => videoRef.current.play();
    const pauseVideo = () => videoRef.current.pause();

    const selectBanana = () => {
        selectRef.current.value = 'banana';
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>🎯 useRef with Various HTML Elements</h2>

            {/* 1. Input */}
            <div>
                <h3>1️⃣ Input – Auto Focus on Load</h3>
                <input ref={inputRef} placeholder="Auto-focused on load" />
            </div>

            {/* 2. Textarea */}
            <div style={{ marginTop: '20px' }}>
                <h3>2️⃣ Textarea – Focus & Select Text</h3>
                <textarea
                    ref={textAreaRef}
                    rows="4"
                    cols="40"
                    defaultValue="Select this text on button click."
                />
                <br />
                <button onClick={handleSelectTextArea}>Focus & Select</button>
            </div>

            {/* 3. Button */}
            <div style={{ marginTop: '20px' }}>
                <h3>3️⃣ Button – Programmatic Click</h3>
                <button ref={buttonRef} onClick={handleRealButtonClick}>
                    Actual Button
                </button>
                <br />
                <button onClick={handleTriggerButtonClick}>Trigger Click</button>
            </div>

            {/* 4. Div */}
            <div style={{ marginTop: '20px' }}>
                <h3>4️⃣ Div – Change Background with useRef</h3>
                <div
                    ref={divRef}
                    style={{
                        border: '1px solid red',
                        padding: '10px',
                        width: '300px',
                    }}
                >
                    This is a div box.
                </div>
                <button onClick={changeDivStyle}>Highlight Div</button>
            </div>

            {/* 5. Video */}
            <div style={{ marginTop: '20px' }}>
                <h3>5️⃣ Video – Play / Pause</h3>
                <video
                    ref={videoRef}
                    width="320"
                    height="240"
                    controls
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                />
                <br />
                <button onClick={playVideo}>Play</button>
                <button onClick={pauseVideo}>Pause</button>
            </div>

            {/* 6. Select */}
            <div style={{ marginTop: '20px' }}>
                <h3>6️⃣ Select – Change Selected Option</h3>
                <select ref={selectRef}>
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="cherry">Cherry</option>
                </select>
                <button onClick={selectBanana}>Select Banana</button>
            </div>
        </div>
    );
}

export default UseRefHtmlElements;
