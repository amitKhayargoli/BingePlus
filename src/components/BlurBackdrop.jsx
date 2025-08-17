import React, { useState } from "react";

const BlurBackdrop = ({ src, children }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative min-h-[60vh] md:h-screen">
      {/* Low quality blurred image */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          imageLoaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px)",
          transform: "scale(1.1)",
        }}
      />

      {/* High quality image */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
      </div>

      {/* Preload high quality image */}
      <img
        src={src}
        alt=""
        className="hidden"
        onLoad={() => setImageLoaded(true)}
      />

      {/* Content */}
      <div className="relative h-full">{children}</div>
    </div>
  );
};

export default BlurBackdrop;
