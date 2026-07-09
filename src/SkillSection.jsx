import TechGlobe from "../src/TechGlobe.jsx";

function SkillsSection() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto mt-24 mb-16 px-6 py-16 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>
          <h2 className="text-5xl font-bold">
            Technologies I Work With
          </h2>

          <p className="mt-6 text-gray-400 leading-8">
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