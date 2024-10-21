import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Link  href="/" className="ml-2 text-2xl font-base">TECHARA</Link>
    </div>
  );
};

export default Logo;
