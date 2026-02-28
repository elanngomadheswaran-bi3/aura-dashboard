"use client";

import { useTheme } from "@/app/context/ThemeContext";
import {
  ComposedChart,
  Line,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TimeVsSpendAnalysisProps {
  projectStartDate: string;
  projectEndDate: string;
  budget: number;
  spent: number;
  totalHours: number;
}

export default function TimeVsSpendAnalysis({
  projectStartDate,
  projectEndDate,
  budget,
  spent,
  totalHours,
}: TimeVsSpendAnalysisProps) {
  const { darkMode } = useTheme();

  // Calculate weekly data based on project duration
  const startDate = new Date(projectStartDate);
  const endDate = new Date(projectEndDate);
  const daysCount = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const weeksCount = Math.ceil(daysCount / 7);
  const weeklyBudget = budget / weeksCount;
  const weeklyHours = totalHours / weeksCount;

  const timeVsSpendData = Array.from({ length: weeksCount }, (_, i) => {
    const weekNum = i + 1;
    const variance = (Math.random() - 0.5) * 0.3;
    const actualSpend = weeklyBudget * (1 + variance);
    const budgetLine = weeklyBudget;

    return {
      week: `W${weekNum}`,
      actual: Math.max(0, actualSpend),
      budget: budgetLine,
      hours: Math.max(0, weeklyHours * (1 + variance * 0.2)),
    };
  });

  return (
    <div
      style={{
        background: darkMode ? "#1F2937" : "white",
        borderRadius: "12px",
        border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
        padding: "32px",
        boxShadow: darkMode
          ? "0px 4px 12px 0px rgba(0,0,0,0.4)"
          : "0px 1px 3px 0px rgba(0,0,0,0.04)",
      }}
    >
      <h3
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: darkMode ? "#F3F4F6" : "#111827",
          marginBottom: "24px",
        }}
      >
        Time vs Spend Analysis
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={timeVsSpendData}>
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkMode ? "#5B8FEB" : "#2D6BDB"}
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor={darkMode ? "#5B8FEB" : "#2D6BDB"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#374151" : "#E5E7EB"}
          />
          <XAxis
            dataKey="week"
            tick={{
              fill: darkMode ? "#9CA3AF" : "#6B7280",
              fontSize: 12,
            }}
            tickLine={{ stroke: darkMode ? "#374151" : "#E5E7EB" }}
          />
          <YAxis
            yAxisId="left"
            tick={{
              fill: darkMode ? "#9CA3AF" : "#6B7280",
              fontSize: 12,
            }}
            tickLine={{ stroke: darkMode ? "#374151" : "#E5E7EB" }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{
              fill: darkMode ? "#9CA3AF" : "#6B7280",
              fontSize: 12,
            }}
            tickLine={{ stroke: darkMode ? "#374151" : "#E5E7EB" }}
            tickFormatter={(value) => `${value.toFixed(0)}h`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#1A1F26" : "white",
              border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
              borderRadius: "8px",
            }}
            formatter={(value: any) => {
              if (typeof value === "number") {
                if (value > 1000) {
                  return `$${(value / 1000).toFixed(1)}K`;
                }
                return `${value.toFixed(1)}h`;
              }
              return value;
            }}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="actual"
            fill="url(#colorActual)"
            stroke={darkMode ? "#5B8FEB" : "#2D6BDB"}
            strokeWidth={2}
            name="Actual Spend"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="budget"
            stroke={darkMode ? "#34D399" : "#10B981"}
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Budget"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="hours"
            stroke={darkMode ? "#FBBF24" : "#F59E0B"}
            strokeWidth={2}
            name="Hours Logged"
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          paddingTop: "24px",
          borderTop: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "3px",
                backgroundColor: darkMode ? "#5B8FEB" : "#2D6BDB",
              }}
            />
            <p
              style={{
                fontWeight: 500,
                fontSize: "12px",
                color: darkMode ? "#9CA3AF" : "#6B7280",
              }}
            >
              Actual Spend
            </p>
          </div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: darkMode ? "#5B8FEB" : "#2D6BDB",
            }}
          >
            ${(spent / 1000).toFixed(1)}K
          </p>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "3px",
                backgroundColor: darkMode ? "#34D399" : "#10B981",
              }}
            />
            <p
              style={{
                fontWeight: 500,
                fontSize: "12px",
                color: darkMode ? "#9CA3AF" : "#6B7280",
              }}
            >
              Total Budget
            </p>
          </div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: darkMode ? "#34D399" : "#10B981",
            }}
          >
            ${(budget / 1000).toFixed(1)}K
          </p>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "3px",
                backgroundColor: darkMode ? "#FBBF24" : "#F59E0B",
              }}
            />
            <p
              style={{
                fontWeight: 500,
                fontSize: "12px",
                color: darkMode ? "#9CA3AF" : "#6B7280",
              }}
            >
              Total Hours
            </p>
          </div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: darkMode ? "#FBBF24" : "#F59E0B",
            }}
          >
            {totalHours}h
          </p>
        </div>
      </div>
    </div>
  );
}
