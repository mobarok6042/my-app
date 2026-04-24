import React, { useState, useEffect } from "react";

function Navbar({ theme, toggleTheme }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div>
      <div
        className="navbar fixed top-0 z-50 shadow-sm"
        style={{
          backgroundColor: "rgba(42, 138, 125, 0.85)",
          minHeight: "4.5rem",
        }}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Projects</a>
              </li>
              <li>
                <a href="">Contact</a>
              </li>
              <li>
                <a>About Me</a>
              </li>
            </ul>
          </div>
          <a href="/" className="btn btn-ghost text-2xl font-bold tracking-wider hover:scale-110 transition-transform duration-200" style={{ fontFamily: "'Lato', sans-serif" }}>
            <span className={theme === "light" ? "text-[#1a1a2e]" : "text-white"}>
              MHOSSEN
            </span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="hover:scale-125 hover:bg-opacity-80 transition-transform duration-200" style={{ fontFamily: "'Lato', sans-serif" }}>Projects</a>
            </li>
            <li>
              <a href="" className="hover:scale-125 hover:bg-opacity-80 transition-transform duration-200" style={{ fontFamily: "'Lato', sans-serif" }}>Contact</a>
            </li>
            <li>
              <a className="hover:scale-125 hover:bg-opacity-80 transition-transform duration-200" style={{ fontFamily: "'Lato', sans-serif" }}>About Me</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end group relative">
          <button 
            onClick={toggleTheme} 
            className="btn btn-circle btn-outline border-2 border-current hover:scale-110 transition-transform duration-200"
          >
            {theme === "light" ? (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.5a8.66,8.66,0,0,1,6.83,3l.13.51a8,8,0,0,0,1.8.9A1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1H3a1,1,0,0,0,0,2H11A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            )}
          </button>
          <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none" style={{ fontFamily: "'Lato', sans-serif" }}>
            {theme === "light" ? "Switch to Dark Mode 🌙" : "Switch to Light Mode ☀️"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
