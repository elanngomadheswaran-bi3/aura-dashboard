import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import LogoBox from "./LogoBox";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    budget: number;
    spent: number;
    status: string;
    clientId: string;
  };
  clientName: string;
  onNavigate: (projectId: string) => void;
  logoSrc?: string;
}


const getBudgetStatus = (spent: number, budget: number) => {
  const percent = (spent / budget) * 100;
  if (percent > 100) {
    return { label: "Overspent", bg: "#FEE2E2", text: "#DC2626" };
  } else if (percent >= 80) {
    return { label: "Near Budget", bg: "#FEF3C7", text: "#F59E0B" };
  } else {
    return { label: "On track", bg: "#D1FAE5", text: "#10B981" };
  }
};

export default function ProjectCard({
  project,
  clientName,
  onNavigate,
  logoSrc,
}: ProjectCardProps) {
  const budgetPercent = (project.spent / project.budget) * 100;
  const budgetStatus = getBudgetStatus(project.spent, project.budget);
  const variance = project.spent - project.budget;
  const isOverBudget = variance > 0;

  return (
    <div
      onClick={() => onNavigate(project.id)}
      style={{
        background: "white",
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        padding: "24px",
        cursor: "pointer",
        transition: "all 0.3s",
        boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0px 20px 25px -5px rgba(0,0,0,0.1)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0px 1px 3px 0px rgba(0,0,0,0.1)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Logo */}
      <LogoBox logoSrc={logoSrc} clientName={clientName} />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#111827",
              marginBottom: "4px",
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              fontSize: "12px",
              color: "#9CA3AF",
            }}
          >
            {clientName}
          </p>
        </div>
        <div
        >
          <span
            style={{
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 600,
              backgroundColor: budgetStatus.bg,
              color: budgetStatus.text,
              whiteSpace: "nowrap",
            }}
          >
            {budgetStatus.label}
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "13px",
          color: "#6B7280",
          marginBottom: "16px",
          lineHeight: "1.5",
        }}
      >
        {project.description}
      </p>

      {/* Budget Bar */}
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "#6B7280",
            }}
          >
            Budget Used
          </span>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#111827",
            }}
          >
            {budgetPercent.toFixed(0)}%
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "#E5E7EB",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              backgroundColor:
                budgetPercent > 100
                  ? "#EF4444"
                  : budgetPercent > 80
                    ? "#F59E0B"
                    : "#10B981",
              width: `${Math.min(budgetPercent, 100)}%`,
              transition: "width 0.3s",
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "16px",
          borderTop: "1px solid #E5E7EB",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "11px",
              color: "#9CA3AF",
              marginBottom: "2px",
            }}
          >
            Budget vs Spent
          </p>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#111827",
            }}
          >
            {formatCurrency(project.budget)} vs {formatCurrency(project.spent)}
          </p>
        </div>
        <ArrowRight className="w-5 h-5" style={{ color: "#2D6BDB" }} />
      </div>

      {/* Variance Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginTop: "16px",
          paddingTop: "16px",
          borderTop: "1px solid #E5E7EB",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "#9CA3AF",
            marginBottom: "0px",
          }}
        >
          Variance
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginLeft: "auto",
          }}
        >
          {isOverBudget ? (
            <TrendingUp size={16} color="#DC2626" />
          ) : (
            <TrendingDown size={16} color="#10B981" />
          )}
          <p
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: isOverBudget ? "#DC2626" : "#10B981",
              marginBottom: "0px",
            }}
          >
            {formatCurrency(Math.abs(variance))}
          </p>
        </div>
      </div>
    </div>
  );
}
