import React from "react";
import Image from "next/image";
const NavBanner = () => {
  return (
    <div>
      <Image
        src="/img/NavBanner.webp"
        alt="NavBanner"
        loading="eager"
        width={1920}
        height={1080}
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default NavBanner;
