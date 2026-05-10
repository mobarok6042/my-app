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
          className={`card shadow-sm transition-all duration-500 ease-in-out group hover:scale-105 hover:shadow-xl ${
            theme === "light"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          {/* Image with hover title overlay */}
          <figure className="relative overflow-hidden">
            <img
              src="https://i.ibb.co.com/1t4f0JZs/legal.png"
              alt="Site preview image unavailable"
              className="w-full"
            />
            {/* Title overlay — visible by default, fades out on hover */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
              <h2
                className="text-white text-4xl font-bold text-center px-4 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Legal Solutions
              </h2>
            </div>
          </figure>

          <div className="card-body">
            {/* Card body title — hidden by default, fades in on hover */}
            <h2 className="card-title text-2xl font-semibold opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
              Legal Solutions
            </h2>
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