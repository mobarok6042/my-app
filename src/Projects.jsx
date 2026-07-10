import React from "react";

const projectCards = [
  {
    title: "Hero Travel",
    image:
      "https://res.cloudinary.com/dwc4wsavj/image/upload/q_auto/f_auto/v1779533752/travel_fgqm8c.png",
    description:
      "This site was designed and developed for a travel agency. It features a responsive design, allowing users to easily navigate and book their travel plans on any device. The site includes a user-friendly interface, making it easy for customers to find and book their desired travel packages.",
    tags: ["Travel", "Tour"],
  },
  {
    title: "Legal Services",
    image:
      "https://res.cloudinary.com/dwc4wsavj/image/upload/q_auto/f_auto/v1779533752/legal_oxb0br.png",
    description:
      "This site was designed and developed for a legal services firm. It features a responsive design, allowing users to easily navigate and access legal information on any device. The site includes a user-friendly interface, making it easy for clients to find and contact the firm's services.",
    tags: ["Legal", "Aid"],
  },
  {
    title: "Car Doctor",
    image:
      "https://res.cloudinary.com/dwc4wsavj/image/upload/q_auto/f_auto/v1779533751/car-doctor_ojv9qp.png",
    description:
      "This site was designed and developed for a car repair service. It features a responsive design, allowing users to easily navigate and access information about various car maintenance and repair services. The site includes a user-friendly interface, making it easy for customers to find and contact the service.",
    tags: ["Automobile", "Garage"],
  },
  {
    title: "Book Vibe",
    image:
      "https://res.cloudinary.com/dwc4wsavj/image/upload/q_auto/f_auto/v1779533749/books_a2ticq.png",
    description:
      "This site was designed and developed for a Book selling and lending service. It features a responsive design, allowing users to easily navigate and access information about various book-related services. The site includes a user-friendly interface, making it easy for customers to find and contact the service.",
    tags: ["Books", "Library"],
  },
  {
    title: "Alpha Crash",
    image:
      "https://res.cloudinary.com/dwc4wsavj/image/upload/q_auto/f_auto/v1779533751/Alpha-Crash_asx2ht.png",
    description:
      "This is just a fun project for my own amusement. It was created for working in my typing speed. It is alphabet typing game where you have to type the alphabet as fast as you can. It features a responsive design, allowing users to easily navigate and access the game on any device. The site includes a user-friendly interface, making it easy for players to enjoy the game and improve their typing skills.",
    tags: ["Alphabet", "Game"],
  },
  {
    title: "Rtero Forum",
    image:
      "https://res.cloudinary.com/dwc4wsavj/image/upload/q_auto/f_auto/v1779533974/Rtero-Forum_vlhak1.png",
    description:
      "This is a blogging site where people can write their thoughts and share with others. It features a responsive design, allowing users to easily navigate and access the site on any device. The site includes a user-friendly interface, making it easy for users to create and share their blog posts with the community.",
    tags: ["Blog", "Community"],
  },
];

function Projects({ theme }) {
  const headingColor = theme === "light" ? "#0f172a" : "#f8fafc";
  const textColor = theme === "light" ? "#475569" : "#cbd5e1";
  const cardClass =
    theme === "light"
      ? "bg-white text-slate-900 border-slate-200"
      : "bg-slate-900/80 text-slate-100 border-slate-700";
  const badgeClass =
    theme === "light"
      ? "border-slate-700 text-slate-700"
      : "border-slate-300 text-slate-200";

  return (
    <div id="projects" className="m-4 px-4 sm:px-10 md:px-20 lg:px-32">
      <div>
        <h2
          className="text-3xl md:text-5xl lg:text-7xl font-extrabold my-5 text-center"
          style={{ fontFamily: "'Lato', sans-serif", color: headingColor }}
        >
          My Recent Projects
        </h2>

        <p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-center leading-relaxed max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto mb-10"
          style={{ color: textColor, fontFamily: "'Lato', sans-serif" }}
        >
          Here is a curated selection of my recent web development projects.
          Each one reflects my commitment to clean code, responsive design, and
          seamless user experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {projectCards.map((project) => (
          <div
            key={project.title}
            className={`card shadow-sm transition-all duration-500 ease-in-out group hover:scale-105 hover:shadow-xl flex flex-col h-full border ${cardClass}`}
          >
            <figure className="relative overflow-hidden h-56 flex-shrink-0">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                <h2
                  className="text-white text-4xl font-bold text-center px-4 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {project.title}
                </h2>
              </div>
            </figure>
            <div className="card-body flex flex-col flex-1">
              <h2
                className="card-title text-2xl font-semibold opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                style={{ color: headingColor }}
              >
                {project.title}
              </h2>
              <p className="flex-1 leading-7" style={{ color: textColor }}>
                {project.description}
              </p>
              <div className="card-actions justify-end mt-auto gap-2">
                {project.tags.map((tag) => (
                  <div
                    key={tag}
                    className={`badge badge-outline text-lg font-semibold ${badgeClass}`}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
