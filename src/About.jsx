import React from "react";
import Collage from "./Collage";

function About({ theme }) {
  return (
    <div id="about" className="m-4 px-4 sm:px-10 md:px-20 lg:px-32">
      <Collage theme={theme} />
    </div>
  );
}

export default About;
