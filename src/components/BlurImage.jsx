import React, { useState } from "react";

const BlurImage = ({ src, alt = "" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* Low quality image (blurred) */}
      <img
        src={src}
        className={`absolute inset-0 w-full h-full object-cover blur-md scale-105 transition-opacity duration-300 ${
          imageLoaded ? "opacity-0" : "opacity-80"
        }`}
        alt={alt}
      />
      
      {/* High quality image */}
      <img
        src={src}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

export default BlurImage;
