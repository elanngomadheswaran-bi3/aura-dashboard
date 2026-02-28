"use client";
import React from "react";

interface SubMetric {
  label: string;
  value: string | number;
}

interface ProjectMetricCardProps {
  label: string;
  value: string | number;
  subtitle: string;
  submetric: SubMetric;
  variant?: "default" | "danger" | "success" | "warning";
  icon?: React.ReactNode;
  onClick?: () => void;
  isButton?: boolean;
}

export default function ProjectMetricCard({
  label,
  value,
  subtitle,
  submetric,
  variant = "default",
  icon,
  onClick,
  isButton = false,
}: ProjectMetricCardProps) {
  const getTextColorClass = () => {
    switch (variant) {
      case "danger":
        return "text-red-600";
      case "success":
        return "text-emerald-600";
      case "warning":
        return "text-amber-500";
      default:
        return "text-gray-900";
    }
  };

  const getIconBgClass = () => {
    switch (variant) {
      case "danger":
        return "bg-red-500/50";
      case "success":
        return "bg-emerald-500/50";
      case "warning":
        return "bg-yellow-500/50";
      default:
        return "bg-blue-500/50";
    }
  };

  const Component = isButton ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className="rounded-2xl border border-slate-200 bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] pt-8 px-7 pb-7 text-left hover:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08),0px_4px_8px_0px_rgba(0,0,0,0.06)] hover:border-blue-600 hover:-translate-y-1 transition-all duration-200 flex flex-col"
    >
      <div className="flex gap-5 items-center">
        {icon && (
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconBgClass()} mb-5`}
          >
            {icon}
          </div>
        )}
      </div>
      <p className="font-medium text-lg tracking-tight text-gray-900 mb-5">
        {label}
      </p>
      <div className="flex items-baseline gap-2 mb-2">
        <p
          className={`text-4xl font-semibold leading-9 ${getTextColorClass()}`}
        >
          {value}
        </p>
      </div>
      <p className="font-normal text-xs leading-[18px] text-gray-600 mb-3">
        {subtitle}
      </p>
      <div className="flex items-center gap-1">
        <p className="text-sm font-medium text-gray-900">{submetric.value}</p>
        <p className="text-sm text-gray-600">{submetric.label}</p>
      </div>
    </Component>
  );
}
