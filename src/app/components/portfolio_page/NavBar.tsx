"use client";

import { Briefcase, Users, Filter, LogOut, Layers } from "lucide-react";
import { useState } from "react";

interface NavBarProps {
  onProjectsClick?: () => void;
  onEmployeesClick: () => void;
  onFiltersClick?: () => void;
  onLogout: () => void;
}

export default function NavBar({
  onProjectsClick,
  onEmployeesClick,
  onFiltersClick,
  onLogout,
}: NavBarProps) {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const NavButton = ({
    id,
    label,
    Icon,
    onClick,
  }: {
    id: string;
    label: string;
    Icon: React.ComponentType<{ className: string }>;
    onClick?: () => void;
  }) => {
    const isActive = activeButton === id;

    return (
      <button
        onClick={() => {
          setActiveButton(id);
          onClick?.();
        }}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
          ${
            isActive ? "bg-white text-bi3-blue" : "text-white hover:bg-white/30"
          }
        `}
      >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <nav className="w-full">
      <div className="w-full px-8 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <Layers className="w-6 h-6 text-bi3-blue" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-white">Aura</h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <NavButton
            id="projects"
            label="Projects"
            Icon={Briefcase}
            onClick={onProjectsClick}
          />
          <NavButton
            id="employees"
            label="Employees"
            Icon={Users}
            onClick={onEmployeesClick}
          />
          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-white hover:bg-white/30 ml-4 pl-8 border-l border-white/20"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
