import React, { useState } from "react";

const BlurImage = ({ src, lowSrc, alt = "" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* Low-res blurred placeholder */}
      <img
        src={lowSrc}
        className="absolute inset-0 w-full h-full object-cover blur-md scale-105"
        alt={alt}
      />

      {/* High-res image fades in */}
      <img
        src={src}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

export default BlurImage;
