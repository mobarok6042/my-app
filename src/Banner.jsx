import React, { useState, useEffect } from 'react'
import pf from './assets/profile-pic.png'

function Banner({ theme }) {
  const bannerBg = theme === "light" ? "rgba(70, 229, 208)" : "rgba(42, 138, 125)";
  const textColor = theme === "light" ? "#1a1a2e" : "#ffffff";
  
  const words = ["WEB DEVELOPER", "ENTREPRENEUR", "DOMAINER"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeout;
    
    if (!isDeleting) {
      // Typing effect
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 100);
      } else {
        // Wait before starting to delete
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting effect
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        // Move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex, words]);
  
  return (
    <div className="border-2 border-green-400 rounded-lg m-4">
        <div className="hero min-h-screen" style={{ backgroundColor: bannerBg }}>
  <div className="hero-content flex-col lg:flex-row-reverse gap-12 px-4">
    <img
      src={pf}
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl shadow-none rounded-lg"
    />
    <div className="text-center lg:text-left">
      <h1 className="text-4xl font-bold" style={{ color: textColor, fontFamily: "'Lato', sans-serif" }}>HI, I AM MOBAROK HOSSEN</h1>
      <p className="py-4 text-xl" style={{ color: textColor, fontFamily: "'Lato', sans-serif" }}>
        I AM A <span className="border-r-2 border-current animate-pulse">{displayText}</span>
      </p>
      <a href="/biodata.pdf" download="Mobarok_Hossen_Biodata.pdf" className="btn btn-primary" style={{ backgroundColor: textColor, borderColor: textColor, color: bannerBg }}>
        Download Resume
      </a>
    </div>
  </div>
</div>
    </div>
  )
}

export default Banner