import React from "react";

const Logo = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-400 to-purple-400 w-10 h-10 rounded-full flex items-center justify-center">
      <span className="text-white font-bold text-lg">
        <img src="/logo.png" alt="Logo" />
      </span>
    </div>
  );
};

export default Logo;
