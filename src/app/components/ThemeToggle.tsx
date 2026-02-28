import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();
  const theme = darkMode ? "dark" : "light";

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 text-sm"
      style={{
        border: `1.5px solid ${theme === "light" ? "#E5E7EB" : "#4B5563"}`,
        backgroundColor: "transparent",
        color: theme === "light" ? "#0F1419" : "#F9FAFB",
        fontWeight: 500,
      }}
    >
      {theme === "light" ? (
        <>
          <Moon style={{ width: "16px", height: "16px", strokeWidth: 1.5 }} />
          <span>Dark</span>
        </>
      ) : (
        <>
          <Sun style={{ width: "16px", height: "16px", strokeWidth: 1.5 }} />
          <span>Light</span>
        </>
      )}
    </button>
  );
}
