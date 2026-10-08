// ChildMemoComponent.jsx
import React, { memo } from "react";

// ✅ Optimized with React.memo
export const ChildMemoComponent = memo(({ name, title }) => {
    console.log("👶 ChildMemoComponent rendered");

    return (
        <div style={{ border: "2px solid green", margin: "10px", padding: "10px" }}>
            <h3>Hello, {name} 👋</h3>
            <p>Title: {title}</p>
        </div>
    );
});

// ❌ Without memo (unoptimized)
// export const ChildMemoComponent = ({ name, title }) => {
//   console.log("👶 ChildMemoComponent rendered");
//   return (
//     <div style={{ border: "2px solid green", margin: "10px", padding: "10px" }}>
//       <h3>Hello, {name} 👋</h3>
//       <p>Title: {title}</p>
//     </div>
//   );
// };
