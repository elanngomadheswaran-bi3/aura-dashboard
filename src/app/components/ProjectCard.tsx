"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Project } from "../../data/mockData";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const { darkMode } = useTheme();

  const budgetPercentage = (project.spent / project.budget) * 100;
  const overspend = project.spent - project.budget;

  const getStatusColor = () => {
    switch (project.status) {
      case "In Progress":
        return "#10B981";
      case "Completed":
        return "#F59E0B";
      case "On Hold":
        return "#EF4444";
    }
  };

  const theme = darkMode ? "dark" : "light";

  return (
    <div
      className="p-8 rounded-2xl transition-all duration-200 cursor-pointer"
      style={{
        backgroundColor: theme === "light" ? "#FFFFFF" : "#1A1F2E",
        boxShadow:
          theme === "light"
            ? "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)"
            : "0 4px 6px rgba(0, 0, 0, 0.3)",
      }}
      onClick={() => router.push(`/project/${project.id}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          theme === "light"
            ? "0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04)"
            : "0 8px 12px rgba(0, 0, 0, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          theme === "light"
            ? "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)"
            : "0 4px 6px rgba(0, 0, 0, 0.3)";
      }}
    >
      <div className="flex items-center justify-between">
        {/* Left: Client Info */}
        <div className="flex-1">
          <div
            className="flex items-center gap-2 mb-3 text-xs tracking-widest uppercase"
            style={{ color: theme === "light" ? "#9CA3AF" : "#6B7280" }}
          >
            <span>{project.description}</span>
            <span style={{ color: theme === "light" ? "#E5E7EB" : "#374151" }}>
              //
            </span>
            <span className="inline-flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: getStatusColor(),
                }}
              />
              {project.status}
            </span>
          </div>
          <h3
            className="text-xl mb-3 tracking-tight"
            style={{
              color: theme === "light" ? "#0F1419" : "#F9FAFB",
              fontWeight: 600,
            }}
          >
            {project.name}
          </h3>
          <div className="flex items-center gap-6 text-sm">
            <span style={{ color: theme === "light" ? "#6B7280" : "#9CA3AF" }}>
              ${project.budget.toLocaleString()} budget
            </span>
            <span style={{ color: theme === "light" ? "#E5E7EB" : "#374151" }}>
              //
            </span>
            <span style={{ color: theme === "light" ? "#6B7280" : "#9CA3AF" }}>
              {budgetPercentage.toFixed(0)}% spent
            </span>
          </div>
        </div>

        {/* Right: Financial Metrics */}
        <div className="flex items-center gap-12">
          <div className="text-right">
            <div
              className="text-xs mb-1 tracking-widest uppercase"
              style={{ color: theme === "light" ? "#9CA3AF" : "#6B7280" }}
            >
              Budget
            </div>
            <div
              className="text-xl tracking-tight"
              style={{
                color: theme === "light" ? "#0F1419" : "#F9FAFB",
                fontWeight: 600,
              }}
            >
              ${(project.budget / 1000).toFixed(0)}K
            </div>
          </div>

          <div className="text-right">
            <div
              className="text-xs mb-1 tracking-widest uppercase"
              style={{ color: theme === "light" ? "#9CA3AF" : "#6B7280" }}
            >
              Spent
            </div>
            <div
              className="text-xl tracking-tight"
              style={{
                color: theme === "light" ? "#0F1419" : "#F9FAFB",
                fontWeight: 600,
              }}
            >
              ${(project.spent / 1000).toFixed(0)}K
            </div>
          </div>

          <div className="text-right min-w-[140px]">
            <div
              className="text-xs mb-1 tracking-widest uppercase"
              style={{ color: theme === "light" ? "#9CA3AF" : "#6B7280" }}
            >
              Variance
            </div>
            <div
              className="text-3xl tracking-tight"
              style={{
                color:
                  overspend > 0
                    ? "#EF4444"
                    : overspend < 0
                      ? "#10B981"
                      : theme === "light"
                        ? "#6B7280"
                        : "#9CA3AF",
                fontWeight: 600,
              }}
            >
              {overspend > 0 ? "+" : ""}${(overspend / 1000).toFixed(0)}K
            </div>
            <div
              className="text-xs mt-1"
              style={{
                color:
                  overspend > 0
                    ? "#EF4444"
                    : overspend < 0
                      ? "#10B981"
                      : theme === "light"
                        ? "#6B7280"
                        : "#9CA3AF",
              }}
            >
              {overspend > 0 ? "+" : ""}
              {((overspend / project.budget) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
