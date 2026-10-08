//5. Import All as Namespace
//import * as MathUtils from "./mathUtils";
import multiply, * as MathUtils from "./mathUtils";
//OR
import { add, subtract } from "./mathUtils";

import "./App.css";
function App() {
  console.log({ ...MathUtils });
  return (
    <div>
      <p>4 + 2 = {MathUtils.add(4, 2)}</p>
      <p>4 - 2 = {MathUtils.subtract(4, 2)}</p>
      <p>4 × 2 = {multiply(4, 2)}</p>
      {/* <p>40 × 20 = {MathUtils.multiply(40, 20)}</p> */}
      <p>40 × 20 = {MathUtils.default(40, 20)}</p>
      {/* OR */}
      <p>4 + 2 = {add(4, 2)}</p>
      <p>4 - 2 = {subtract(4, 2)}</p>
    </div>
  );
}
export default App;
/*
MathUtils = {
  add: add,
  subtract: subtract,
  default: multiply
};
*/
