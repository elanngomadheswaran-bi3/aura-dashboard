import { useTheme } from "../context/ThemeContext";
import { Layers } from "lucide-react";

export function LoadingScreen() {
  const { darkMode } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center transition-colors duration-200"
      style={{ backgroundColor: darkMode ? "#0F1419" : "#fafbfc" }}
    >
      <div className="flex flex-col items-center gap-[32px]">
        {/* Logo with subtle pulse animation */}
        <div className="animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-bi3-blue rounded-lg flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <span
              className="text-2xl font-bold"
              style={{ color: darkMode ? "#FAFBFC" : "#0f1419" }}
            >
              BI3 Dashboard
            </span>
          </div>
        </div>

        {/* Loading spinner */}
        <div className="relative w-[48px] h-[48px]">
          <div
            className="absolute inset-0 rounded-full border-[3px] border-t-transparent animate-spin"
            style={{
              borderColor: darkMode ? "#374151" : "#E5E7EB",
              borderTopColor: "transparent",
            }}
          />
          <div
            className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-current animate-spin"
            style={{
              color: darkMode ? "#5B8FEB" : "#2D6BDB",
              animationDuration: "1s",
            }}
          />
        </div>

        {/* Loading text */}
        <p
          className="  font-medium text-[14px] tracking-[-0.2px]"
          style={{ color: darkMode ? "#9CA3AF" : "#6B7280" }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
}
