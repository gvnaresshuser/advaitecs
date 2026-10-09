import { useState } from "react";

function ProblemComponent() {
  const [result, setResult] = useState("");

  const handleCalculate = () => {
    const price = 1000;
    const quantity = 3;
    const discount = 10;

    // Intentional bug: discount is treated as a fixed amount.
    const total = price * quantity - discount;

    console.log("Price:", price);
    console.log("Quantity:", quantity);
    console.log("Discount:", discount);
    console.log("Calculated total:", total);

    setResult(`Total amount: ₹${total}`);
  };

  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
      <span className="rounded-md bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
        INTENTIONAL BUG
      </span>

      <h3 className="mt-4 text-lg font-semibold">Shopping Cart Calculator</h3>

      <p className="mt-2 text-sm text-slate-400">
        Price: ₹1,000 · Quantity: 3 · Discount: 10%
      </p>

      <button
        onClick={handleCalculate}
        className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500"
      >
        Calculate Total
      </button>

      {result && <p className="mt-4 rounded-lg bg-slate-900 p-3">{result}</p>}
    </div>
  );
}

export default ProblemComponent;
//The intended calculation is a 10% discount on ₹3,000. 
// The problem code subtracts just ₹10 instead.