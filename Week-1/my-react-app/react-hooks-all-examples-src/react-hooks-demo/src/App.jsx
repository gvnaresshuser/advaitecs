import HookDemo from "./components/HookDemo";

function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-center text-3xl font-bold text-slate-900">
          React Hooks — Simple Examples
        </h1>

        <p className="mx-auto mb-8 mt-2 max-w-3xl text-center text-slate-600">
          Built-in React hooks and reusable custom hooks with simple,
          practical examples.
        </p>

        <HookDemo />
      </div>
    </main>
  );
}

export default App;
