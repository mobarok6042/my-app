import React, { useState } from "react";

// ── Replace these with your actual photo URLs ──────────────────────────────
const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    caption: "Adventure awaits",
    tag: "Travel",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    caption: "Good times with great people",
    tag: "Friends",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
    caption: "Where the magic happens",
    tag: "Work",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80",
    caption: "Finding peace in nature",
    tag: "Nature",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80",
    caption: "Moments worth keeping",
    tag: "Life",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
    caption: "City lights never sleep",
    tag: "City",
  },
];

// ── Lightbox component ─────────────────────────────────────────────────────
function Lightbox({ photo, onClose, onPrev, onNext }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
        />
        <p
          className="text-white text-center mt-3 text-lg font-semibold"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          {photo.caption}
        </p>

        {/* Prev / Next */}
        <button
          onClick={onPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white text-4xl font-bold hover:scale-125 transition-transform"
        >
          ‹
        </button>
        <button
          onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white text-4xl font-bold hover:scale-125 transition-transform"
        >
          ›
        </button>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg hover:scale-110 transition-transform shadow-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ── Main Collage component ─────────────────────────────────────────────────
function Collage({ theme }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const openLightbox = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);
  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  const goNext = () =>
    setActiveIndex((prev) => (prev + 1) % photos.length);

  return (
    <div className="m-4 px-32">
      {/* Section heading — identical style to Projects */}
      <h2
        className="text-3xl md:text-5xl lg:text-7xl font-extrabold my-5 text-center"
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        My moments
      </h2>

      {/* Masonry-style grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(index)}
            className={`card shadow-sm transition-all duration-500 ease-in-out group hover:scale-105 hover:shadow-xl cursor-pointer flex flex-col h-full ${
              theme === "light"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            {/* Image with hover caption overlay */}
            <figure className="relative overflow-hidden h-56 flex-shrink-0">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              {/* Dark overlay + caption — visible by default, fades on hover */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                <h2
                  className="text-white text-2xl font-bold text-center px-4 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {photo.caption}
                </h2>
              </div>
            </figure>

            <div className="card-body flex flex-col flex-1">
              {/* Caption fades in on hover — matches Projects title behavior */}
              <h2 className="card-title text-xl font-semibold opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                {photo.caption}
              </h2>
              <p className="flex-1 text-sm opacity-70">
                Click to view full photo
              </p>
              <div className="card-actions justify-end mt-auto">
                <div
                  className={`badge badge-outline text-base font-semibold ${
                    theme === "light"
                      ? "border-white text-white"
                      : "border-gray-900 text-gray-900"
                  }`}
                >
                  {photo.tag}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <Lightbox
          photo={photos[activeIndex]}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}

export default Collage;