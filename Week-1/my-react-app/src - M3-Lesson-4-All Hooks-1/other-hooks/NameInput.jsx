import { useId } from "react";

function NameInput() {
  const id = useId();

  return (
    <div className="mb-4">
      <label htmlFor={id}>Enter your name:</label>

      <input id={id} type="text" />
    </div>
  );
}

export default NameInput;
