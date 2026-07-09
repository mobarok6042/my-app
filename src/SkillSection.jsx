import TechGlobe from "./TechGlobe.jsx";

function SkillsSection() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
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
        <TechGlobe />

      </div>
    </section>
  );
}

export default SkillsSection;