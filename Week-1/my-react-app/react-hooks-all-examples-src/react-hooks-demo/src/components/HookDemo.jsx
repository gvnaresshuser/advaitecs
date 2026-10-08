import {
  forwardRef,
  useContext,
  useCallback,
  useDeferredValue,
  useId,
  useImperativeHandle,
  useEffect,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
} from "react";
import { createContext } from "react";
import useFetch from "../hooks/useFetch";
import useHttp from "../hooks/useHttp";
import useToggle from "../hooks/useToggle";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext("light");

function Card({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-2 text-lg font-bold text-slate-800">{title}</h2>
      <div className="text-sm text-slate-600">{children}</div>
    </section>
  );
}

// 1. useState
function UseStateDemo() {
  const [count, setCount] = useState(0);

  return (
    <Card title="1. useState — component state">
      <p className="mb-3 text-2xl font-bold">{count}</p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        Increment
      </button>
    </Card>
  );
}

// 2. useEffect
function UseEffectDemo() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card title="2. useEffect — side effects">
      <p>A timer is updated using an effect.</p>
      <p className="mt-2 font-semibold">{seconds} seconds</p>
    </Card>
  );
}

// 3. useRef
function UseRefDemo() {
  const inputRef = useRef(null);

  return (
    <Card title="3. useRef — DOM reference">
      <input
        ref={inputRef}
        placeholder="Click Focus"
        className="mr-2 rounded-lg border px-3 py-2"
      />
      <button
        onClick={() => inputRef.current?.focus()}
        className="rounded-lg bg-slate-800 px-4 py-2 text-white"
      >
        Focus
      </button>
    </Card>
  );
}

// 4. useMemo
function UseMemoDemo() {
  const [number, setNumber] = useState(10);
  const [other, setOther] = useState(0);

  const squared = useMemo(() => {
    console.log("Calculating square...");
    return number * number;
  }, [number]);

  return (
    <Card title="4. useMemo — memoized value">
      <p>Square: {squared}</p>
      <button
        onClick={() => setNumber((n) => n + 1)}
        className="mr-2 mt-3 rounded-lg bg-blue-600 px-3 py-2 text-white"
      >
        Change number
      </button>
      <button
        onClick={() => setOther((n) => n + 1)}
        className="rounded-lg bg-slate-200 px-3 py-2"
      >
        Other state: {other}
      </button>
    </Card>
  );
}

// 5. useCallback
function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    console.log("Memoized function called");
  }, []);

  return (
    <Card title="5. useCallback — memoized function">
      <p>Function reference is kept stable until dependencies change.</p>
      <button
        onClick={() => {
          setCount((c) => c + 1);
          handleClick();
        }}
        className="mt-3 rounded-lg bg-blue-600 px-3 py-2 text-white"
      >
        Render: {count}
      </button>
    </Card>
  );
}

// 6. useContext
function UseContextDemo() {
  return (
    <ThemeContext.Provider value="Dark Theme">
      <ContextChild />
    </ThemeContext.Provider>
  );
}

function ContextChild() {
  const theme = useContext(ThemeContext);

  return (
    <Card title="6. useContext — shared data">
      <p>Child received: <strong>{theme}</strong></p>
    </Card>
  );
}

// 7. useReducer
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { count: state.count + 1 };
    case "REMOVE":
      return { count: Math.max(0, state.count - 1) };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

function UseReducerDemo() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <Card title="7. useReducer — complex state">
      <p className="mb-3 font-semibold">Cart items: {state.count}</p>
      <button onClick={() => dispatch({ type: "ADD" })} className="mr-2 rounded bg-green-600 px-3 py-2 text-white">Add</button>
      <button onClick={() => dispatch({ type: "REMOVE" })} className="mr-2 rounded bg-red-600 px-3 py-2 text-white">Remove</button>
      <button onClick={() => dispatch({ type: "RESET" })} className="rounded bg-slate-200 px-3 py-2">Reset</button>
    </Card>
  );
}

// 8. useImperativeHandle
const CustomInput = forwardRef(function CustomInput(_, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) inputRef.current.value = "";
    },
  }));

  return (
    <input
      ref={inputRef}
      placeholder="Custom input"
      className="mr-2 rounded-lg border px-3 py-2"
    />
  );
});

function UseImperativeHandleDemo() {
  const inputRef = useRef(null);

  return (
    <Card title="8. useImperativeHandle — parent controls child API">
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()} className="mr-2 rounded bg-blue-600 px-3 py-2 text-white">Focus</button>
      <button onClick={() => inputRef.current?.clear()} className="rounded bg-slate-200 px-3 py-2">Clear</button>
    </Card>
  );
}

// 9. useLayoutEffect
function UseLayoutEffectDemo() {
  const boxRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    setWidth(boxRef.current?.getBoundingClientRect().width ?? 0);
  }, []);

  return (
    <Card title="9. useLayoutEffect — measure before paint">
      <div ref={boxRef} className="rounded-lg bg-slate-100 p-4">
        Measure this box
      </div>
      <p className="mt-2">Width: {Math.round(width)}px</p>
    </Card>
  );
}

// 10. useInsertionEffect
function UseInsertionEffectDemo() {
  useInsertionEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .insertion-demo {
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <Card title="10. useInsertionEffect — CSS-in-JS">
      <p className="insertion-demo">Styles inserted before layout effects.</p>
      <p className="mt-2 text-xs text-slate-500">
        Mostly used by CSS-in-JS/library authors.
      </p>
    </Card>
  );
}

// 11. useId
function UseIdDemo() {
  const id = useId();

  return (
    <Card title="11. useId — unique HTML IDs">
      <label htmlFor={id} className="mr-2">Email</label>
      <input id={id} className="rounded border px-3 py-2" placeholder="email@example.com" />
    </Card>
  );
}

// 12. useTransition
function UseTransitionDemo() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    const next = e.target.value;
    setValue(next);

    startTransition(() => {
      const result = Array.from({ length: 3000 }, (_, i) => `${next} - Item ${i + 1}`);
      setList(result);
    });
  }

  return (
    <Card title="12. useTransition — non-urgent update">
      <input value={value} onChange={handleChange} className="w-full rounded border px-3 py-2" placeholder="Type quickly..." />
      <p className="mt-2">{isPending ? "Updating large list..." : "Ready"}</p>
      <p className="mt-2 text-xs">Rendered items: {list.length}</p>
    </Card>
  );
}

// 13. useDeferredValue
function UseDeferredValueDemo() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const results = useMemo(
    () => Array.from({ length: 2000 }, (_, i) => `Product ${i + 1}`).filter((name) =>
      name.toLowerCase().includes(deferredSearch.toLowerCase())
    ),
    [deferredSearch]
  );

  return (
    <Card title="13. useDeferredValue — deferred value">
      <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Search products..." />
      <p className="mt-2">Showing: {results.length}</p>
    </Card>
  );
}

// 14. useSyncExternalStore
function subscribeToOnlineStatus(callback) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);

  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getOnlineSnapshot() {
  return navigator.onLine;
}

function UseSyncExternalStoreDemo() {
  const isOnline = useSyncExternalStore(
    subscribeToOnlineStatus,
    getOnlineSnapshot
  );

  return (
    <Card title="14. useSyncExternalStore — external data">
      <p className="font-semibold">
        {isOnline ? "🟢 Online" : "🔴 Offline"}
      </p>
      <p className="mt-2 text-xs">
        React is subscribed to the browser's online/offline events.
      </p>
    </Card>
  );
}

// 15. useFetch custom hook
function UseFetchDemo() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users?_limit=3"
  );

  return (
    <Card title="15. useFetch — reusable fetching logic">
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-600">{error.message}</p>}
      {data?.map((user) => <p key={user.id}>{user.name}</p>)}
    </Card>
  );
}

// 16. useHttp custom hook
function UseHttpDemo() {
  const { sendRequest, loading, error } = useHttp();
  const [message, setMessage] = useState("");

  async function loadUser() {
    try {
      const data = await sendRequest(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setMessage(`Loaded: ${data.name}`);
    } catch {
      // error is already stored by the hook
    }
  }

  return (
    <Card title="16. useHttp — reusable HTTP logic">
      <button onClick={loadUser} className="rounded bg-blue-600 px-3 py-2 text-white">
        {loading ? "Loading..." : "GET User"}
      </button>
      {message && <p className="mt-2">{message}</p>}
      {error && <p className="mt-2 text-red-600">{error.message}</p>}
    </Card>
  );
}

// 17. useToggle custom hook
function UseToggleDemo() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <Card title="17. useToggle — reusable boolean logic">
      <button onClick={toggle} className="rounded bg-blue-600 px-3 py-2 text-white">
        {isOpen ? "Hide" : "Show"} Menu
      </button>
      {isOpen && (
        <div className="mt-3 rounded-lg bg-slate-100 p-3">
          Menu is open
        </div>
      )}
    </Card>
  );
}

// 18. useLocalStorage custom hook
function UseLocalStorageDemo() {
  const [name, setName] = useLocalStorage("hooks-demo-name", "");

  return (
    <Card title="18. useLocalStorage — persistent state">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded border px-3 py-2"
        placeholder="Type your name and refresh..."
      />
      <p className="mt-2">Saved value: {name || "Nothing yet"}</p>
    </Card>
  );
}

export default function HookDemo() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <UseStateDemo />
      <UseEffectDemo />
      <UseRefDemo />
      <UseMemoDemo />
      <UseCallbackDemo />
      <UseContextDemo />
      <UseReducerDemo />
      <UseImperativeHandleDemo />
      <UseLayoutEffectDemo />
      <UseInsertionEffectDemo />
      <UseIdDemo />
      <UseTransitionDemo />
      <UseDeferredValueDemo />
      <UseSyncExternalStoreDemo />
      <UseFetchDemo />
      <UseHttpDemo />
      <UseToggleDemo />
      <UseLocalStorageDemo />
    </div>
  );
}
