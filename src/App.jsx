import "./App.css";
import Banner from "./Banner.jsx";
import Navbar from "./Navbar.jsx";
import Projects from "./Projects.jsx";
import About from "./About.jsx";
import SkillSection from "./SkillSection.jsx";
import ParticleBackground from "./ParticleBackground.jsx";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.title = "Mobarok Hossen | Portfolio";
  }, []);

  const bgStyle = {
    background:
      theme === "light"
        ? "linear-gradient(135deg, rgba(248, 250, 252, 0.82) 0%, rgba(226, 232, 240, 0.68) 100%)"
        : "linear-gradient(135deg, rgba(2, 6, 23, 0.98) 0%, rgba(15, 23, 42, 0.94) 100%)",
  };
  const textColor = theme === "light" ? "#0f172a" : "#f8fafc";
  const mutedText = theme === "light" ? "#475569" : "#cbd5e1";

  return (
    <div
      className="relative isolate min-h-screen overflow-x-hidden transition-colors duration-300"
      style={bgStyle}
    >
      <ParticleBackground theme={theme} />
      <div className="relative z-10">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Banner theme={theme} />
        <SkillSection theme={theme} />
        <Projects theme={theme} />
        <About theme={theme} />
        <section id="contact" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-6" style={{ color: textColor, fontFamily: "'Lato', sans-serif" }}>
            Contact
          </h2>
          <p className="max-w-2xl mx-auto leading-8" style={{ color: mutedText, fontFamily: "'Lato', sans-serif" }}>
            Have a project idea or want to collaborate? Reach out by email or
            connect with me on your preferred platform.
          </p>
        </div>
      </section>
      </div>
    </div>
  );
}

export default App;