import NavBar from "./NavBar";
import MetricsBar from "./MetricsBar";

interface HeaderProps {
  onLogout: () => void;
  onEmployeesClick: () => void;
  metrics?: {
    atRiskProjects: number;
    projectsOverBudget: number;
    totalVariance: number;
    variancePercent: string;
    totalBudget: number;
    activeProjects: number;
    clientsCount: number;
    avgUtilization: number;
    overallocatedResources: number;
  };
  subheader?: React.ReactNode;
}

export default function Header({
  onLogout,
  onEmployeesClick,
  metrics,
  subheader,
}: HeaderProps) {
  return (
    <header
      style={{
        top: 0,
        zIndex: 50,
        background: `
          linear-gradient(180deg, #2D6BDB 0%, #2D6BDB 75%, #f9fafb 75%, #f9fafb 100%),
          radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
        `,
        backgroundBlendMode: "multiply, normal",
      }}
      className="w-full flex flex-col justify-center items-center"
    >
      {/* Navigation Bar */}
      <NavBar onEmployeesClick={onEmployeesClick} onLogout={onLogout} />

      {/* Sub Header */}
      {subheader && subheader}

      {/* Metrics Bar */}
      {metrics && <MetricsBar metrics={metrics} />}
    </header>
  );
}
