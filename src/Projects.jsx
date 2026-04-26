import React from "react";

function Projects() {
  return (
    <div className="m-4 px-32">
      <div className="">
        <h2
          className="text-7xl font-extrabold my-5 text-center"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          My recent projects
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-sm">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Card Title
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;