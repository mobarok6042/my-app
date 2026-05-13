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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {/* Project 1 */}
        <div
          className={`card shadow-sm transition-all duration-500 ease-in-out group hover:scale-105 hover:shadow-xl flex flex-col h-full ${
            theme === "light"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          {/* Image with hover title overlay */}
          <figure className="relative overflow-hidden h-56 flex-shrink-0">
            <img
              src="https://i.ibb.co.com/Pv5GZNq5/travel.png"
              alt="Site preview image unavailable"
              className="w-full h-full object-cover"
            />
            {/* Title overlay — visible by default, fades out on hover */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
              <h2
                className="text-white text-4xl font-bold text-center px-4 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Hero Travel
              </h2>
            </div>
          </figure>

          <div className="card-body flex flex-col flex-1">
            {/* Card body title — hidden by default, fades in on hover */}
            <h2 className="card-title text-2xl font-semibold opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
              Hero Travel
            </h2>
            <p className="flex-1">
              This site was designed and developed for a travel agency. It
              features a responsive design, allowing users to easily navigate
              and book their travel plans on any device. The site includes a
              user-friendly interface, making it easy for customers to find and
              book their desired travel packages.
            </p>
            <div className="card-actions justify-end mt-auto">
              <div
                className={`badge badge-outline text-lg font-semibold ${
                  theme === "light"
                    ? "border-white text-white"
                    : "border-gray-900 text-gray-900"
                }`}
              >
                Travel
              </div>
              <div
                className={`badge badge-outline text-lg font-semibold ${
                  theme === "light"
                    ? "border-white text-white"
                    : "border-gray-900 text-gray-900"
                }`}
              >
                Tour
              </div>
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div
          className={`card shadow-sm transition-all duration-500 ease-in-out group hover:scale-105 hover:shadow-xl flex flex-col h-full ${
            theme === "light"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          {/* Image with hover title overlay */}
          <figure className="relative overflow-hidden h-56 flex-shrink-0">
            <img
              src="https://i.ibb.co.com/1t4f0JZs/legal.png"
              alt="Site preview image unavailable"
              className="w-full h-full object-cover"
            />
            {/* Title overlay — visible by default, fades out on hover */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
              <h2
                className="text-white text-4xl font-bold text-center px-4 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Legal Services
              </h2>
            </div>
          </figure>

          <div className="card-body flex flex-col flex-1">
            {/* Card body title — hidden by default, fades in on hover */}
            <h2 className="card-title text-2xl font-semibold opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
              Legal Services
            </h2>
            <p className="flex-1">
              This site was designed and developed for a legal services firm. It
              features a responsive design, allowing users to easily navigate
              and access legal information on any device. The site includes a
              user-friendly interface, making it easy for clients to find and
              contact the firm's services.
            </p>
            <div className="card-actions justify-end mt-auto">
              <div
                className={`badge badge-outline text-lg font-semibold ${
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
                Aid
              </div>
            </div>
          </div>
        </div>

        {/* Project 3 */}
        <div
          className={`card shadow-sm transition-all duration-500 ease-in-out group hover:scale-105 hover:shadow-xl flex flex-col h-full ${
            theme === "light"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          {/* Image with hover title overlay */}
          <figure className="relative overflow-hidden h-56 flex-shrink-0">
            <img
              src="https://i.ibb.co.com/m5vhs6vy/car-doctor.png"
              alt="Site preview image unavailable"
              className="w-full h-full object-cover"
            />
            {/* Title overlay — visible by default, fades out on hover */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
              <h2
                className="text-white text-4xl font-bold text-center px-4 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Car Doctor
              </h2>
            </div>
          </figure>

          <div className="card-body flex flex-col flex-1">
            {/* Card body title — hidden by default, fades in on hover */}
            <h2 className="card-title text-2xl font-semibold opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
              Car Doctor
            </h2>
            <p className="flex-1">
              This site was designed and developed for a car repair service. It
              features a responsive design, allowing users to easily navigate
              and access information about various car maintenance and repair
              services. The site includes a user-friendly interface, making it
              easy for customers to find and contact the service.
            </p>
            <div className="card-actions justify-end mt-auto">
              <div
                className={`badge badge-outline text-lg font-semibold ${
                  theme === "light"
                    ? "border-white text-white"
                    : "border-gray-900 text-gray-900"
                }`}
              >
                Automobile
              </div>
              <div
                className={`badge badge-outline text-lg font-semibold ${
                  theme === "light"
                    ? "border-white text-white"
                    : "border-gray-900 text-gray-900"
                }`}
              >
                Garage
              </div>
            </div>
          </div>
        </div>
        {/* Project 4 */}
        <div
          className={`card shadow-sm transition-all duration-500 ease-in-out group hover:scale-105 hover:shadow-xl flex flex-col h-full ${
            theme === "light"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          {/* Image with hover title overlay */}
          <figure className="relative overflow-hidden h-56 flex-shrink-0">
            <img
              src="https://i.ibb.co.com/XfZHrgzH/books.png"
              alt="Site preview image unavailable"
              className="w-full h-full object-cover"
            />
            {/* Title overlay — visible by default, fades out on hover */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
              <h2
                className="text-white text-4xl font-bold text-center px-4 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Book Vibe
              </h2>
            </div>
          </figure>

          <div className="card-body flex flex-col flex-1">
            {/* Card body title — hidden by default, fades in on hover */}
            <h2 className="card-title text-2xl font-semibold opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
              Book Vibe
            </h2>
            <p className="flex-1">
              This site was designed and developed for a Book selling and lending service. It
              features a responsive design, allowing users to easily navigate
              and access information about various book-related services. The site includes a user-friendly interface, making it
              easy for customers to find and contact the service.
            </p>
            <div className="card-actions justify-end mt-auto">
              <div
                className={`badge badge-outline text-lg font-semibold ${
                  theme === "light"
                    ? "border-white text-white"
                    : "border-gray-900 text-gray-900"
                }`}
              >
                Books
              </div>
              <div
                className={`badge badge-outline text-lg font-semibold ${
                  theme === "light"
                    ? "border-white text-white"
                    : "border-gray-900 text-gray-900"
                }`}
              >
                Library
              </div>
            </div>
          </div>
        </div>
        {/* Project 5 */}
        <div
          className={`card shadow-sm transition-all duration-500 ease-in-out group hover:scale-105 hover:shadow-xl flex flex-col h-full ${
            theme === "light"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          {/* Image with hover title overlay */}
          <figure className="relative overflow-hidden h-56 flex-shrink-0">
            <img
              src="https://i.ibb.co.com/ycJYCNZZ/Alpha-Crash.png"
              alt="Site preview image unavailable"
              className="w-full h-full object-cover"
            />
            {/* Title overlay — visible by default, fades out on hover */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
              <h2
                className="text-white text-4xl font-bold text-center px-4 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Alpha Crash
              </h2>
            </div>
          </figure>

          <div className="card-body flex flex-col flex-1">
            {/* Card body title — hidden by default, fades in on hover */}
            <h2 className="card-title text-2xl font-semibold opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
              Alpha Crash
            </h2>
            <p className="flex-1">
              This is just a fun project for my own amusement. It was created for working in my typing speed.It is alphabet tying game where you have to type the alphabet as fast as you can. It features a responsive design, allowing users to easily navigate and access the game on any device. The site includes a user-friendly interface, making it easy for players to enjoy the game and improve their typing skills.
            </p>
            <div className="card-actions justify-end mt-auto">
              <div
                className={`badge badge-outline text-lg font-semibold ${
                  theme === "light"
                    ? "border-white text-white"
                    : "border-gray-900 text-gray-900"
                }`}
              >
                Alphabet
              </div>
              <div
                className={`badge badge-outline text-lg font-semibold ${
                  theme === "light"
                    ? "border-white text-white"
                    : "border-gray-900 text-gray-900"
                }`}
              >
                Game
              </div>
            </div>
          </div>
        </div>
        {/* Project 6 */}
        <div
          className={`card shadow-sm transition-all duration-500 ease-in-out group hover:scale-105 hover:shadow-xl flex flex-col h-full ${
            theme === "light"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          {/* Image with hover title overlay */}
          <figure className="relative overflow-hidden h-56 flex-shrink-0">
            <img
              src="https://i.ibb.co.com/nqCPdgzZ/Rtero-Forum.png"
              alt="Site preview image unavailable"
              className="w-full h-full object-cover"
            />
            {/* Title overlay — visible by default, fades out on hover */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
              <h2
                className="text-white text-4xl font-bold text-center px-4 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Rtero Forum
              </h2>
            </div>
          </figure>

          <div className="card-body flex flex-col flex-1">
            {/* Card body title — hidden by default, fades in on hover */}
            <h2 className="card-title text-2xl font-semibold opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
              Rtero Forum
            </h2>
            <p className="flex-1">
              This is blogging site where people can write their thoughts and share with others. It features a responsive design, allowing users to easily navigate and access the site on any device. The site includes a user-friendly interface, making it easy for users to create and share their blog posts with the community.
            </p>
            <div className="card-actions justify-end mt-auto">
              <div
                className={`badge badge-outline text-lg font-semibold ${
                  theme === "light"
                    ? "border-white text-white"
                    : "border-gray-900 text-gray-900"
                }`}
              >
                Blog
              </div>
              <div
                className={`badge badge-outline text-lg font-semibold ${
                  theme === "light"
                    ? "border-white text-white"
                    : "border-gray-900 text-gray-900"
                }`}
              >
                Community
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;