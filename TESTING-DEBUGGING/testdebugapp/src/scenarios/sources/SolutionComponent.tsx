import { useState } from "react";

function SolutionComponent() {
  const [result, setResult] = useState("");

  const handleCalculate = () => {
    const price = 1000;
    const quantity = 3;
    const discount = 10;

    const subtotal = price * quantity;
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal - discountAmount;

    console.log("Price:", price);
    console.log("Quantity:", quantity);
    console.log("Subtotal:", subtotal);
    console.log("Discount percentage:", discount);
    console.log("Discount amount:", discountAmount);
    console.log("Final total:", total);

    setResult(`Total amount: ₹${total}`);
  };

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
      <span className="rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
        FIXED VERSION
      </span>

      <h3 className="mt-4 text-lg font-semibold">Shopping Cart Calculator</h3>

      <p className="mt-2 text-sm text-slate-400">
        Price: ₹1,000 · Quantity: 3 · Discount: 10%
      </p>

      <button
        onClick={handleCalculate}
        className="mt-5 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500"
      >
        Calculate Total
      </button>

      {result && <p className="mt-4 rounded-lg bg-slate-900 p-3">{result}</p>}
    </div>
  );
}

export default SolutionComponent;
