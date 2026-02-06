import React, { useState } from "react";
import auth from "../services/functions/auth.js";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../services/store/adminStore";

const LogIn = () => {
  const navigate = useNavigate();
  const { setLanguage, language } = useAdminStore(); 
  
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const dict = {
    en: {
      title: "LOG IN",
      userLabel: "Username",
      userPlace: "Enter your username",
      passLabel: "Password",
      passPlace: "Enter your password",
      btn: "Log In",
      welcome: "Welcome Back!",
    },
    sq: {
      title: "KYÇU",
      userLabel: "Përdoruesi",
      userPlace: "Shënoni përdoruesin",
      passLabel: "Fjalëkalimi",
      passPlace: "Shënoni fjalëkalimin",
      btn: "Kyçu",
      welcome: "Mirë se vini përsëri!",
    },
    mk: {
      title: "НАЈАВА",
      userLabel: "Корисничко име",
      userPlace: "Внесете корисничко име",
      passLabel: "Лозинка",
      passPlace: "Внесете лозинка",
      btn: "Најави се",
      welcome: "Добредојдовте назад!",
    }
  };

  const lang = dict[language] || dict.en;

  const handleLogIn = async () => {
    const result = await auth(username, password);
    if (!result.success) {
      setError(result.error);
      return;
    }
    navigate(result.role === "admin" ? "/admin/dashboard" : "/admin/donors", {
      replace: true,
    });
    return;
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-slate-50 p-4">
      <div className="w-full max-w-[400px] h-fit p-8 md:p-10 bg-white rounded-2xl shadow-lg flex flex-col items-center">
        
        {/* Language Picker */}
        <div className="flex gap-4 mb-6 self-end">
          {["en", "sq", "mk"].map((l) => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              className={`text-[10px] font-black uppercase tracking-widest ${
                language === l ? "text-slate-900 border-b-2 border-slate-900" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <h1 className="text-2xl font-semibold md:text-3xl mb-8">{lang.title}</h1>

        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-base font-medium text-slate-700">
              {lang.userLabel}
            </label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 text-sm md:text-base"
              placeholder={lang.userPlace}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-base font-medium text-slate-700">
              {lang.passLabel}
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-4 pr-12 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 text-sm md:text-base"
                placeholder={lang.passPlace}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 transition-colors"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogIn}
            className="mt-4 h-11 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black transition-all active:scale-95 shadow-md shadow-slate-200 text-sm md:text-base"
          >
            {lang.btn}
          </button>
        </div>
        {!error ? (
          <p className="mt-8 text-xs md:text-sm text-slate-400">
            {lang.welcome}
          </p>
        ) : (
          <p className="mt-8 text-red-500 text-xs md:text-sm text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default LogIn;