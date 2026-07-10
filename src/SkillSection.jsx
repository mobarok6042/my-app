import TechGlobe from "../src/TechGlobe.jsx";

function SkillsSection({ theme }) {
  const headingColor = theme === "light" ? "#0f172a" : "#f8fafc";
  const textColor = theme === "light" ? "#475569" : "#cbd5e1";

  return (
    <section id="skills" className="relative z-10 max-w-7xl mx-auto mt-24 mb-16 px-6 py-16 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>
          <h2 className="text-5xl font-bold" style={{ color: headingColor, fontFamily: "'Lato', sans-serif" }}>
            Technologies I Work With
          </h2>

          <p className="mt-6 leading-8" style={{ color: textColor, fontFamily: "'Lato', sans-serif" }}>
            I build responsive and modern web applications using React,
            JavaScript, Tailwind CSS, Node.js, Express, MongoDB, and Firebase.
            I'm continuously learning new technologies to create better user
            experiences.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex justify-center lg:justify-end w-full">
          <TechGlobe className="w-full" style={{ width: "100%", maxWidth: 480, height: 480 }} />
        </div>

      </div>
    </section>
  );
}

export default SkillsSection;