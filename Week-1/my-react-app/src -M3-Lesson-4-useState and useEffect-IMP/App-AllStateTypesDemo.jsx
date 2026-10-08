import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("John");
  const [isVisible, setIsVisible] = useState(true);
  const [fruits, setFruits] = useState(["Apple"]);
  const [numbers, setNumbers] = useState([1, 2]);
  const [users, setUsers] = useState([{ id: 1, name: "Alice" }]);
  const [user, setUser] = useState({ name: "John", age: 30 });
  const [data, setData] = useState(["text", 42, { key: "value" }]);

  //-----------------------------------------------------------
  //PLEASE REFER SCREEN - 0.How React Updates State Internally
  //USE THIS WAY
  //setCount((prev) => prev + 1)
  //NEVER USE THIS WAY
  //setCount(count + 1)
  //-----------------------------------------------------------

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <style>
        {`
      button {
        border: 1px solid navy;
        padding: 6px 12px;
        margin: 4px;
        border-radius: 6px;
        background-color: #f0f8ff;
        color: navy;
        cursor: pointer;
      }
    
    `}
      </style>
      <h2>🧠 useState with All Data Types</h2>

      {/* Number */}
      <p>🔢 Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Increment Count
      </button>

      {/* String */}
      <p>🧵 Name: {name}</p>
      <button onClick={() => setName((prev) => prev + " Doe")}>
        Append to Name
      </button>

      {/* Boolean */}
      <p>🧠 Visible: {isVisible.toString()}</p>
      <button onClick={() => setIsVisible((prev) => !prev)}>
        Toggle Visibility
      </button>

      {/* Array of Strings */}
      <p>🧺 Fruits: {fruits.join()}</p>
      {/*  <p>
        🧺 Fruits:{" "}
        {fruits.map((fruit, index) => (
          <span key={index}>
            {fruit}
            {index < fruits.length - 1 && " | "}
          </span>
        ))}
      </p>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
      <p>
        🧺 Fruits:{" "}
        {fruits.map((fruit, index) => (
          <span key={index}>{fruit} </span>
        ))}
      </p> */}
      <button onClick={() => setFruits((prev) => [...prev, "Mango"])}>
        Add Fruit
      </button>

      {/* Array of Numbers */}
      <p>🔢 Numbers: {numbers.join()}</p>
      <button onClick={() => setNumbers((prev) => [...prev, prev.length + 1])}>
        Add Number
      </button>

      {/* Array of Objects */}
      <p>🧾 Users: {users.map((u) => `${u.name} (id:${u.id})`).join()}</p>
      <button
        onClick={() =>
          setUsers((prev) => [
            ...prev,
            { id: prev.length + 1, name: "Bob" + (prev.length + 1) },
          ])
        }
      >
        Add User
      </button>
      <button
        onClick={() =>
          setUsers((prev) =>
            prev.map((user) =>
              user.id === 1 ? { ...user, name: "Alicia" } : user,
            ),
          )
        }
      >
        Update User ID 1
      </button>

      {/* Object */}
      <p>🧍‍♂️ User: {JSON.stringify(user)}</p>
      <button onClick={() => setUser((prev) => ({ ...prev, name: "Jane" }))}>
        Update Name in Object
      </button>

      {/* Mixed Array */}
      <p>
        🧮 Mixed:{" "}
        {data
          .map((item, i) =>
            typeof item === "object" ? JSON.stringify(item) : item,
          )
          .join(", ")}
      </p>
      <button onClick={() => setData((prev) => [...prev, { another: "item" }])}>
        Add to Mixed Array
      </button>
      <button
        onClick={() =>
          setData((prev) => [
            ...prev,
            "another text",
            prev.length + 100, // or any logic-based number
            { another: "item" },
          ])
        }
      >
        Add to Mixed Array
      </button>
      <button
        onClick={() => {
          setData((prev) =>
            prev.map((item) => {
              if (typeof item === "string" && item === "text") {
                return "updated text";
              } else if (typeof item === "number" && item === 42) {
                return 100;
              } else if (typeof item === "object" && item.key === "value") {
                return { ...item, key: "updated value" };
              } else if (typeof item === "object" && item.another === "item") {
                console.log("here");
                return { ...item, another: "Hello Naressh" };
              }
              return item; // leave others unchanged
            }),
          );
        }}
      >
        Update Mixed Array
      </button>
    </div>
  );
};

export default App;
/*
— you do not need to create a temporary array yourself in your code.

Your code:

setUsers((prev) =>
  prev.map((user) =>
    user.id === 1
      ? { ...user, name: "Alicia" }
      : user
  )
);
Why?

Because map() automatically creates and returns a new array.

Think of it like:

prev
 ↓
map()
 ↓
NEW ARRAY
 ↓
setUsers(NEW ARRAY)

For example:

prev = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
]

map() produces:

NEW ARRAY = [
  { id: 1, name: "Alicia" },
  { id: 2, name: "Bob" }
]

Then:

setUsers(NEW ARRAY)
What about the objects?

This part:

{ ...user, name: "Alicia" }

also creates a new object for user ID 1.

So you're actually doing:

OLD ARRAY
   ↓
map()
   ↓
NEW ARRAY
   ↓
   ├── user ID 1 → NEW OBJECT
   │                 { ...user, name: "Alicia" }
   │
   └── other users → SAME OBJECT REFERENCES

That's exactly what you want for immutable state updates.

Therefore, this is perfectly fine:
setUsers((prev) =>
  prev.map((user) =>
    user.id === 1 ? { ...user, name: "Alicia" } : user
  )
);

You don't need:

const temp = [...prev];

because map() itself gives you the new array.
*/
