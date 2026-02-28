"use client";

import { AlertCircle, TrendingUp, Briefcase, Users } from "lucide-react";
import MetricCard from "./MetricCard";
import { formatCurrency } from "@/utils/formatters";

interface MetricsBarProps {
  metrics: {
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
}

export default function MetricsBar({ metrics }: MetricsBarProps) {
  return (
    <div
      style={{
        padding: "32px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Metrics Grid */}
        <div
          className="flex gap-10"
        >
          {/* Portfolio Health */}
          <MetricCard
            icon={<AlertCircle />}
            label="Portfolio Health"
            value={metrics.atRiskProjects}
            subtitle={`at risk • ${metrics.projectsOverBudget} over budget`}
            variant="danger"
          />

          {/* Total Variance */}
          <MetricCard
            icon={<TrendingUp size={20} strokeWidth={2} />}
            label="Total Variance"
            value={formatCurrency(Math.abs(metrics.totalVariance))}
            subtitle={`${metrics.totalVariance > 0 ? "+" : ""}${metrics.variancePercent}% ${metrics.totalVariance > 0 ? "Over" : "Under"} ${formatCurrency(metrics.totalBudget)} budget`}
            variant={metrics.totalVariance > 0 ? "danger" : "success"}
          />

          {/* Active Projects */}
          <MetricCard
            icon={<Briefcase size={20} strokeWidth={2} />}
            label="Active Projects"
            value={metrics.activeProjects}
            subtitle={`Across ${metrics.clientsCount} clients`}
          />

          {/* Workforce */}
          <MetricCard
            icon={<Users size={20} strokeWidth={2} />}
            label="Workforce"
            value={`${metrics.avgUtilization}%`}
            subtitle={`${metrics.overallocatedResources} overallocated resources`}
            variant={metrics.overallocatedResources > 0 ? "warning" : "success"}
          />
        </div>
      </div>
    </div>
  );
}
