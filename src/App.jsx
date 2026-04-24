import "./App.css";
import Banner from "./Banner.jsx";
import Navbar from "./Navbar.jsx";
import Projects from "./Projects.jsx";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Theme-based background colors
  const lightBg = "rgba(70, 229, 208)";
  const darkBg = "rgba(42, 138, 125)";
  const bgColor = theme === "light" ? lightBg : darkBg;

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ 
        background: bgColor
      }}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme}></Navbar>
      <Banner theme={theme}></Banner>
      <Projects></Projects>
    </div>
  );
}

export default App;
