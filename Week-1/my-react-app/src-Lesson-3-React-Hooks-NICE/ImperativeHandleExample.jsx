import React, { useRef } from "react";
import CustomInput from "./CustomInput";
import "./ImperativeHandleExample.css";

const ImperativeHandleExample = () => {
  const ref = useRef(); //PARENT

  const handleFocus = () => {
    ref.current.giveFocus();
  };

  const handleBackground = () => {
    ref.current.changeBackground("red");
  };

  const handleFontSize = () => {
    ref.current.increaseFontSize();
  };

  const handleFontStyle = () => {
    ref.current.changeFontStyle("italic");
  };

  const handleChangeColor = () => {
    ref.current.changeColor("cyan");
  };

    const handleDecoration = () => {
      ref.current.changeTextDecoration("underline");
    };

  return (
    <>
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
          useImperativeHandle Hook
        </h1>
      </div>

      <CustomInput ref={ref} />

      <button className="action-btn" onClick={handleFocus}>
        Focus
      </button>
      <button className="action-btn" onClick={handleBackground}>
        Change Background
      </button>
      <button className="action-btn" onClick={handleChangeColor}>
        Change Text Color
      </button>
      <button className="action-btn" onClick={handleDecoration}>
        Change Decoration
      </button>
      <button className="action-btn" onClick={handleFontSize}>
        Increase Font Size
      </button>
      <button className="action-btn" onClick={handleFontStyle}>
        Italic Font
      </button>
    </>
  );
};

export default ImperativeHandleExample;
