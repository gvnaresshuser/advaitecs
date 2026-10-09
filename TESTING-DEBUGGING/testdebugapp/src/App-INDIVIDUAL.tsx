//1111111111111111111111111111
//scenario 01: Console — Undefined Data Error.
/* import ConsoleScenario from "./scenarios/console/ConsoleScenario";

function App() {
  return <ConsoleScenario />;
}

export default App; */
//--------------------------------------------------------------------------
//Scenario 02: Network — API Returns 404
/* import NetworkScenario from "./scenarios/network/NetworkScenario";

function App() {
  return <NetworkScenario />;
}

export default App; */
//--------------------------------------------------------------------------
//Scenario 03: Network — API returns data, but React displays nothing
/* import ResponseScenario from "./scenarios/network/ResponseScenario";

function App() {
  return <ResponseScenario />;
}

export default App; */
//--------------------------------------------------------------------------
//Scenario 04: Elements — Incorrect CSS and Tailwind Styling.

/* import ElementsScenario from "./scenarios/elements/ElementsScenario";

function App() {
  return <ElementsScenario />;
}

export default App; */

//--------------------------------------------------------------------------
//Scenario 05: Sources — Debug JavaScript with Breakpoints.

//The intended calculation is a 10% discount on ₹3,000.
// The problem code subtracts just ₹10 instead.

/* import SourcesScenario from "./scenarios/sources/SourcesScenario";

function App() {
  return <SourcesScenario />;
}

export default App; */
//--------------------------------------------------------------------------
//Scenario 06: React Developer Tools — Debug Incorrect Props and State
/* import ReactDevToolsScenario from "./scenarios/react-devtools/ReactDevToolsScenario";

function App() {
  return <ReactDevToolsScenario />;
}

export default App; */
//--------------------------------------------------------------------------
//Scenario 07: React State Debugging — Incorrect State Updates and Stale Values
/* 
import StateScenario from "./scenarios/react-devtools/StateScenario";

function App() {
  return <StateScenario />;
}

export default App; */

//--------------------------------------------------------------------------
//Scenario 08: useEffect Debugging — Repeated API Calls and Missing Dependencies

/* import UseEffectScenario from "./scenarios/use-effect/UseEffectScenario";

function App() {
  return <UseEffectScenario />;
}

export default App; */
//--------------------------------------------------------------------------
//Scenario 09: Responsive Design — Debug Mobile Layout Overflow.
/* import ResponsiveScenario from "./scenarios/responsive/ResponsiveScenario";

function App() {
  return <ResponsiveScenario />;
}

export default App; */
//--------------------------------------------------------------------------
//Scenario 10: Forms — Debug Incorrect Form Validation, with deliberately
// incorrect validation rules and a corrected implementation.

/* import FormsScenario from "./scenarios/forms/FormsScenario";

function App() {
  return <FormsScenario />;
}

export default App; */
//--------------------------------------------------------------------------
//Scenario 11: React Query debugging — stale data and cache invalidation,
// using a simple example suitable for your students.
//------------------- Without React Query Devtools --------------------
/* 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactQueryScenario from "./scenarios/react-query/ReactQueryScenario";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryScenario />
    </QueryClientProvider>
  );
}

export default App; 
*/
//------------------- With React Query Devtools --------------------
/* import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactQueryScenario from "./scenarios/react-query/ReactQueryScenario";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryScenario />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App; */
//--------------------------------------------------------------------------
//Scenario 12: TypeScript build errors and debugging.

/* import TypeScriptScenario from "./scenarios/typescript/TypeScriptScenario";

function App() {
  return <TypeScriptScenario />;
}

export default App; */
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
