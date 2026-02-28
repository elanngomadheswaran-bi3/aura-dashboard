interface ClientCardProps {
  client: {
    id: string;
    name: string;
    description: string;
    status: string;
  };
  projectCount: number;
  totalBudget: number;
  totalSpent: number;
  onNavigate: (clientId: string) => void;
  logoSrc?: string;
  projectsOverBudget?: number;
}

import { formatCurrency } from "@/utils/formatters";
import LogoBox from "./LogoBox";
import { TrendingUp, TrendingDown } from "lucide-react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress":
      return { bg: "#D1FAE5", text: "#10B981" };
    case "Completed":
      return { bg: "#FEF3C7", text: "#F59E0B" };
    case "On Hold":
      return { bg: "#FEE2E2", text: "#DC2626" };
    case "Active":
      return { bg: "#D1FAE5", text: "#10B981" };
    default:
      return { bg: "#F3F4F6", text: "#6B7280" };
  }
};

export default function ClientCard({
  client,
  projectCount,
  totalBudget,
  totalSpent,
  onNavigate,
  logoSrc,
  projectsOverBudget = 0,
}: ClientCardProps) {
  const statusColor = getStatusColor(client.status);
  const utilization = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const variance = totalSpent - totalBudget;
  const isOverBudget = variance > 0;

  return (
    <div
      onClick={() => onNavigate(client.id)}
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
      <LogoBox logoSrc={logoSrc} clientName={client.name} />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#111827",
          }}
        >
          {client.name}
        </h3>
        {projectsOverBudget > 0 && (
          <span
            style={{
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 600,
              backgroundColor: "#FEE2E2",
              color: "#DC2626",
              whiteSpace: "nowrap",
            }}
          >
            {projectsOverBudget} overspent
          </span>
        )}
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "13px",
          color: "#6B7280",
          marginBottom: "20px",
          lineHeight: "1.5",
        }}
      >
        {client.description}
      </p>

      {/* Metrics Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          paddingTop: "16px",
          borderTop: "1px solid #E5E7EB",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "11px",
              color: "#9CA3AF",
              marginBottom: "4px",
            }}
          >
            Projects
          </p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {projectCount}
          </p>
        </div>
        <div>
          <p
            style={{
              fontSize: "11px",
              color: "#9CA3AF",
              marginBottom: "4px",
            }}
          >
            Total Budget
          </p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {formatCurrency(totalBudget)}
          </p>
        </div>
        <div>
          <p
            style={{
              fontSize: "11px",
              color: "#9CA3AF",
              marginBottom: "4px",
            }}
          >
            Spent
          </p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {formatCurrency(totalSpent)}
          </p>
        </div>
        <div>
          <p
            style={{
              fontSize: "11px",
              color: "#9CA3AF",
              marginBottom: "4px",
            }}
          >
            Utilization
          </p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {utilization.toFixed(0)}%
          </p>
        </div>
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
          Total Variance
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
