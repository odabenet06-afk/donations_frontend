import React from "react";
import { useState } from "react";
import auth from "../services/functions/auth.js";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleLogIn = async () => {
    const result = await auth(username, password);
    if (!result.success) {
      setError(result.error);
      return;
    }
    console.log(result.role);
    navigate(result.role === "admin" ? "/admin/dashboard" : "/admin/donors", {
      replace: true,
    });
    return;
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-slate-50 p-4">
      <div className="w-full max-w-[400px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[500px] h-fit p-8 md:p-14 bg-white rounded-2xl shadow-lg flex flex-col items-center">
        <h1 className="text-3xl font-semibold md:text-5xl mb-10">LOG IN</h1>

        <div className="w-full flex flex-col gap-6 md:gap-10">
          <div className="flex flex-col gap-2">
            <label className="text-lg md:text-2xl font-medium text-slate-700">
              Username
            </label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="h-12 px-4 md:h-20 md:text-2xl md:rounded-3xl rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Enter your username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg md:text-2xl font-medium text-slate-700">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 pr-12 md:h-20 md:pr-16 md:text-2xl md:rounded-3xl rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 transition-colors"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 md:w-8 md:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 md:w-8 md:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogIn}
            className="mt-6 h-12 rounded-xl md:h-20 md:text-2xl md:rounded-3xl bg-slate-900 text-white font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
          >
            Log In
          </button>
        </div>
        {!error ? (
          <p className="mt-8 text-sm md:text-2xl md:mt-12 text-slate-500">
            Welcome Back!
          </p>
        ) : (
          <p className="text-red-500 md:text-2xl md:mt-12 mt-8 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default LogIn;
