   import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState('');
    const handleSubmit= async(e)=>{
        e.prevenDefault();
        setError('');
        try{
            const res = await axios.post('',{
                email,
                password,
            });



        }catch(err){
            console.error(err);
            setError('Đăng nhập thất bại')
        }

    }
    const GoogleIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
      fill="#4285F4"
    />
    <path
      d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z"
      fill="#34A853"
    />
    <path
      d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z"
      fill="#FBBC05"
    />
    <path
      d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z"
      fill="#EB4335"
    />
  </svg>
);
const XIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={`fill-current ${className}`}
    viewBox="0 0 21 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.6705 1.875H18.4272L12.4047 8.75833L19.4897 18.125H13.9422L9.59717 12.4442L4.62554 18.125H1.86721L8.30887 10.7625L1.51221 1.875H7.20054L11.128 7.0675L15.6705 1.875ZM14.703 16.475H16.2305L6.37054 3.43833H4.73137L14.703 16.475Z" />
  </svg>
);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-xl transition active:scale-95"
        aria-label="Toggle theme"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="relative p-6 sm:p-0">
        <div className="relative flex flex-col justify-center min-h-screen lg:flex-row">

          <div className="flex flex-col flex-1">
            <div className="w-full max-w-md pt-10 mx-auto">
              {/* <Link
                to="/"
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                ← Back to dashboard
              </Link> */}
            </div>

            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
              <div>
                <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                  Sign In
                </h1>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                  Enter your email and password to sign in!
                </p>

                {/* <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button className="py-3 flex gap-5  items-center px-5  text-sm rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:text-white/90">
                   <GoogleIcon/> <div>Sign in with Google</div>
                  </button>
                  <button className="py-3 flex gap-5  items-center px-10 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:text-white/90">
                    <XIcon/><div> Sign in with X</div>
                  </button>
                </div> */}

                <div className="my-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-400">
                  {/* <span className="relative top-[-10px] px-3 bg-white dark:bg-gray-900">
                    Or
                  </span> */}
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="block mb-1 text-sm text-gray-700 dark:text-gray-400">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="info@gmail.com"
                      className="w-full h-11 px-4 text-sm border rounded-lg bg-transparent border-gray-300 focus:ring-brand-500/20 focus:border-brand-300 dark:border-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm text-gray-700 dark:text-gray-400">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full h-11 px-4 text-sm border rounded-lg bg-transparent border-gray-300 focus:ring-brand-500/20 focus:border-brand-300 dark:border-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-400">
                      <input type="checkbox" />
                      Keep me logged in
                    </label>

                    {/* <Link
                      to="/reset-password"
                      className="text-brand-500 hover:text-brand-600"
                    >
                      Forgot password?
                    </Link> */}
                  </div>

                  <button className="w-full py-3 text-sm text-white rounded-lg bg-brand-500 hover:bg-brand-600">
                    Sign in
                  </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-700 dark:text-gray-400">
                  Don't have an account?{" "}
                  {/* <Link to="/signup" className="text-brand-500 hover:text-brand-600">
                    Sign Up
                  </Link> */}
                </p>
              </div>
            </div>
          </div>

          <div className="items-center hidden w-1/2 bg-brand-950 dark:bg-white/5 lg:flex">
            <div className="mx-auto text-center flex items-center gap-5">
              <img className="dark:block w-150" src="./images/logo/logo-dark.png" alt="Logo"/>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
