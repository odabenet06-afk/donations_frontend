import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 flex flex-col lg:flex-row items-center justify-center border-slate-200 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-4">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} OpenHands. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
