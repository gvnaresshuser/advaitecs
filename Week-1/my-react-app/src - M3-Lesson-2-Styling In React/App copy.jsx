import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import roseImg from "./assets/rose.jpg";
import shipImg from "/ship.png";
import StylingCard from "./StylingCard";
import ProfileCard from "./ProfileCard";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <StylingCard /> */}
      <ProfileCard />
    </>
  );
}

export default App;
