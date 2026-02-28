"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Sparkles, Layers } from "lucide-react";
import { useLoading } from "@/context/LoadingContext";

function Bi3Logo({ darkMode }: { darkMode: boolean }) {
  const fillColor = darkMode ? "#FAFBFC" : "#0f1419";

  return (
    <div className="h-13 w-41.75 relative">
      <div className="absolute inset-[0.14%_66.62%_0.14%_0.09%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 55.5939 51.854"
        >
          <g>
            <path d="M10,10 H50 V50 H10 Z" fill={fillColor} />
            <path d="M15,15 H45 V45 H15 Z" fill={fillColor} />
            <path d="M20,20 H40 V40 H20 Z" fill={fillColor} />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { setIsLoading } = useLoading();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setIsLoading(true);
      // Simulate loading for 2 seconds
      setTimeout(() => {
        setIsLoading(false);
        router.push("/portfolio");
      }, 2000);
    }
  };

  return (
    <div className="h-screen flex w-full">
      {/* LEFT PANEL - Branding Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-full">
        {/* Blue-Dominant Gradient Background (70% blue, 30% violet) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0a1e3d 0%, #0f2847 15%, #1e3a8a 30%, #1e40af 45%, #2563eb 60%, #3b82f6 75%, #6366f1 90%, #7c3aed 100%)",
          }}
        />

        {/* Mesh Gradient Overlays for depth - blue focused */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(37, 99, 235, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(30, 64, 175, 0.5) 0%, transparent 60%),
              radial-gradient(circle at 50% 50%, rgba(15, 40, 71, 0.6) 0%, transparent 70%)
            `,
          }}
        />

        {/* Large soft abstract gradient shape - blue emphasis */}
        <div
          className="absolute top-1/4 left-1/4 rounded-full opacity-35 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.7) 0%, rgba(99, 102, 241, 0.3) 50%, transparent 100%)",
          }}
        />

        {/* Animated Gradient Loading Effect - blue-dominant */}
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            backgroundImage: `linear-gradient(135deg, 
              rgba(30, 64, 175, 0.25) 0%, 
              rgba(37, 99, 235, 0.2) 25%, 
              rgba(59, 130, 246, 0.15) 50%, 
              rgba(99, 102, 241, 0.1) 75%, 
              rgba(30, 64, 175, 0.25) 100%)`,
            backgroundSize: "200% 200%",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col justify-between h-full w-full p-16">
          {/* Top-left decorative symbol */}
          <div className="flex items-start">
            <div
              className="w-12 h-12 rounded-[12px] flex items-center justify-center shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Bottom-left caption text */}
          <div className="w-4/5 gap-5 flex flex-col">
            <p className=" font-semibold text-[11px] text-white/80 tracking-[2px] uppercase">
              Project Intelligence Portal
            </p>
            <h2 className="font-semibold text-white tracking-[-0.5px] text-3xl">
              Real-time visibility into project performance, costs, and
              resources.
            </h2>
            <p>
              monitor budgets, track utilization, and drive smarter decisions.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Login Form */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-8 bg-[#FAFBFC]">
        <div className="w-full max-w-120">
          {/* Login Card */}
          <div
            className="bg-white rounded-3xl shadow-[0px_8px_32px_0px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.04)]"
            style={{
              paddingTop: "48px",
              paddingBottom: "48px",
              paddingLeft: "40px",
              paddingRight: "40px",
            }}
          >
            {/* BI3 Branding */}
            <div className="text-center">
              {/* Product Name with Icon */}
              <div className="flex items-center justify-center gap-3 mb-1">
                <div
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center"
                  style={{ backgroundColor: "#2D6BDB" }}
                >
                  <Layers className="w-5.5 h-5.5 text-white" strokeWidth={2} />
                </div>
                <h1
                  style={{
                    fontFamily:
                      "Helvetica Neue, Helvetica, system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: "44px",
                    lineHeight: "48px",
                    letterSpacing: "-0.01em",
                    color: "#111827",
                  }}
                >
                  Aura
                </h1>
              </div>

              {/* Attribution */}
              <p
                className=""
                style={{
                  fontWeight: 400,
                  fontSize: "13px",
                  lineHeight: "20px",
                  marginBottom: "24px",
                  color: "#2D6BDB",
                }}
              >
                Powered by BI3 Technologies
              </p>

              {/* Login Subheading */}
              <h2
                className=" text-grey-text"
                style={{
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "26px",
                  marginBottom: "24px",
                }}
              >
                User Login
              </h2>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              {/* Username Field */}
              <div style={{ marginBottom: "16px" }}>
                <label htmlFor="username" className="block  text-grey-text">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full p-3 rounded-lg my-2 border-2 transition-all duration-200 text-bi3-text-primary outline-none"
                  style={{
                    borderColor:
                      focusedField === "username" ? "#2D6BDB" : "#E5E7EB",
                    boxShadow:
                      focusedField === "username"
                        ? "0 0 0 3px rgba(45, 107, 219, 0.1)"
                        : "none",
                    backgroundColor: "#ffffff",
                  }}
                  placeholder="Enter your username"
                  required
                />
              </div>

              {/* Password Field */}
              <div style={{ marginBottom: "24px" }}>
                <label
                  htmlFor="password"
                  className="block  text-grey-text"
                  style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "20px",
                    marginBottom: "8px",
                  }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 pr-12 rounded-[12px] border-2 transition-all duration-200  text-[15px] text-bi3-text-primary outline-none"
                    style={{
                      borderColor:
                        focusedField === "password" ? "#2D6BDB" : "#E5E7EB",
                      boxShadow:
                        focusedField === "password"
                          ? "0 0 0 3px rgba(45, 107, 219, 0.1)"
                          : "none",
                      backgroundColor: "#ffffff",
                    }}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-light-grey hover:text-[#6B7280] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4.5 h-4.5" />
                    ) : (
                      <Eye className="w-4.5 h-4.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-[12px] bg-blue-primary text-white  font-semibold transition-all duration-200 hover:bg-blue-dark active:scale-95"
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Sign In
              </button>
            </form>

            {/* Footer */}
            <div
              className="text-center  text-light-grey"
              style={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "20px",
                marginTop: "24px",
              }}
            ></div>
          </div>
          <p className="text-light-grey text-center p-5 text-sm">
            Project Cost Inteligence Platform
          </p>
        </div>
      </div>
    </div>
  );
}
