import "./App.css";
import Banner from "./Banner.jsx";
import Navbar from "./Navbar.jsx";
import Projects from "./Projects.jsx";
import About from "./About.jsx";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.title = "Mobarok Hossen | Portfolio";
  }, []);

  const lightBg = "rgba(70, 229, 208)";
  const darkBg = "rgba(42, 138, 125)";
  const bgColor = theme === "light" ? lightBg : darkBg;

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ background: bgColor }}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Banner theme={theme} />
      <Projects theme={theme} />
      <About theme={theme} />
      <TechGlobe  theme={theme} />
    </div>
  );
}

export default App;