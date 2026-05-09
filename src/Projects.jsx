import React from "react";

function Projects({ theme }) {
  return (
    <div className="m-4 px-32">
      <div className="">
        <h2
          className="text-3xl md:text-5xl lg:text-7xl font-extrabold my-5 text-center"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          My recent projects
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className={`card shadow-sm transition-colors duration-300 ${
            theme === "light"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          <figure>
            <img
              src="https://i.ibb.co.com/1t4f0JZs/legal.png"
              alt="Site preview image unavailable"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl font-semibold">Legal Solutions</h2>
            <p>
              This site is designed and developed for one of my assignments in
              my university. It is a legal solution website that provides legal
              services to clients. The site is built using HTML, CSS, and
              JavaScript.
            </p>
            <div className="card-actions justify-end">
              <div
                className={`badge badge-outline text-lg font-semibold${
                  theme === "light"
                    ? "border-white text-white"
                    : "border-gray-900 text-gray-900"
                }`}
              >
                Legal
              </div>
              <div
                className={`badge badge-outline text-lg font-semibold ${
                  theme === "light"
                    ? "border-white text-white"
                    : "border-gray-900 text-gray-900"
                }`}
              >
                Services
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;