import React from "react";

const Footer = () => {
  const lang = "en";
  const dict = {
    en: "All rights reserved.",
    sq: "Të gjitha të drejtat e rezervuara.",
    mk: "Сите права се задржани.",
  };

  const rightsText = dict[lang] || dict.en;

  return (
    <footer className="bg-slate-50 flex flex-col lg:flex-row items-center justify-center border-slate-200 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} OpenHands. {rightsText}
        </p>
        <p className="text-sm text-slate-500">
          Made by{" "}
          <a className="font-bold" href="https://www.eagle.mk/">
            Eagle IT
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
