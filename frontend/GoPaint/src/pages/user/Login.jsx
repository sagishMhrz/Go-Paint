import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLoggedIn } from "../../components/user/Header";
import { setPainterLoggedIn } from "../../components/painter/Header";
import loginImage from "../../assets/login.png";
import axios from "axios";

function PersonIcon({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function PaintRollerIcon({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="3" width="20" height="5" rx="1.5" />
      <path d="M6 8v2a2 2 0 0 0 2 2h1v9" />
      <path d="M14 8v2a2 2 0 0 0 2 2h1v9" />
      <path d="M9 19h6" />
    </svg>
  );
}

function EyeIcon({ className }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ className }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M1 1l22 22" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    </svg>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-300 focus:bg-white";

export default function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        },
      );

      const { role, userId, fullName } = response.data;

      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      localStorage.setItem("fullName", fullName);

      if (role === "USER") {
        setLoggedIn("user");
        navigate("/user-dashboard");
      } else if (role === "PAINTER") {
        setPainterLoggedIn();
        navigate("/painter-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6] p-8 font-heading">
      <div className="grid w-full max-w-[720px] overflow-hidden rounded-2xl bg-white shadow-xl sm:grid-cols-2">
        {/* Left image panel */}
        <div className="relative hidden min-h-[420px] sm:block">
          <img
            src={loginImage}
            alt="Painter applying orange paint to a wall"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-xl font-bold leading-snug tracking-tight">
              Transform Your Space
            </h2>
            <p className="mt-2 max-w-[240px] text-xs font-normal leading-relaxed text-white/85">
              Create beautiful interiors with perfect color combinations
              tailored to your style
            </p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="relative flex flex-col justify-center px-8 py-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute right-5 top-5 text-xl font-light leading-none text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Close"
          >
            ×
          </button>

          <div className="mb-5">
            <h1 className="text-2xl font-bold tracking-tight text-[#1B2559]">
              Welcome Back!
            </h1>
            <p className="mt-1 text-xs text-gray-400">Login to your account</p>
          </div>

          {/* User type toggle */}
          <div className="mb-5 flex rounded-full bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setUserType("user")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-semibold transition-all ${
                userType === "user"
                  ? "bg-white text-[#E07B39] shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                  : "bg-transparent text-gray-500"
              }`}
            >
              <PersonIcon
                className={
                  userType === "user" ? "text-[#E07B39]" : "text-gray-400"
                }
              />
              User
            </button>
            <button
              type="button"
              onClick={() => setUserType("painter")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-semibold transition-all ${
                userType === "painter"
                  ? "bg-white text-[#E07B39] shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                  : "bg-transparent text-gray-500"
              }`}
            >
              <PaintRollerIcon
                className={
                  userType === "painter" ? "text-[#E07B39]" : "text-gray-400"
                }
              />
              Painter
            </button>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="login-email"
              className="mb-1.5 block text-xs font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="login-password"
              className="mb-1.5 block text-xs font-medium text-gray-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot password */}
          <div className="mb-5 flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#3B82F6] focus:ring-[#3B82F6]/30"
              />
              <span className="text-xs text-gray-500">Remember me</span>
            </label>
            <button
              type="button"
              className="text-xs font-medium text-[#E07B39] transition-colors hover:text-[#c96a2f]"
            >
              Forgot password?
            </button>
          </div>
          {error && <p className="mb-3 text-xs text-red-500">{error}</p>}
          {/* Login button */}
          <button
            type="button"
            onClick={handleLogin}
            className="w-full rounded-lg bg-[#3B82F6] py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2563EB]"
          >
            Login
          </button>

          {/* Sign up */}
          <p className="mt-5 text-center text-xs text-gray-500">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="font-bold text-[#1B2559] transition-colors hover:text-[#3B82F6]"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
