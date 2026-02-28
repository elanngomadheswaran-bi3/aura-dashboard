"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface CostSplitByLevelProps {
  teamData: Array<{
    role: string;
    totalHours: number;
    hourlyRate: number;
  }>;
}

export default function CostSplitByLevel({ teamData }: CostSplitByLevelProps) {
  const { darkMode } = useTheme();

  // Categorize team members by level and calculate costs
  const costByLevel: Record<
    string,
    { cost: number; percentage: number; color: string; hours: number }
  > = {
    Senior: {
      cost: 0,
      percentage: 0,
      color: darkMode ? "#5B8FEB" : "#2D6BDB",
      hours: 0,
    },
    "Mid-Level": {
      cost: 0,
      percentage: 0,
      color: darkMode ? "#34D399" : "#10B981",
      hours: 0,
    },
    Junior: {
      cost: 0,
      percentage: 0,
      color: darkMode ? "#FBBF24" : "#F59E0B",
      hours: 0,
    },
  };

  let totalCost = 0;

  teamData.forEach((member) => {
    const memberCost = member.totalHours * member.hourlyRate;
    totalCost += memberCost;

    if (member.role.toLowerCase().includes("senior")) {
      costByLevel.Senior.cost += memberCost;
      costByLevel.Senior.hours += member.totalHours;
    } else if (
      member.role.toLowerCase().includes("mid") ||
      member.role.toLowerCase().includes("lead")
    ) {
      costByLevel["Mid-Level"].cost += memberCost;
      costByLevel["Mid-Level"].hours += member.totalHours;
    } else {
      costByLevel.Junior.cost += memberCost;
      costByLevel.Junior.hours += member.totalHours;
    }
  });

  const chartData = Object.entries(costByLevel).map(([level, data]) => ({
    name: level,
    value: totalCost > 0 ? Math.round((data.cost / totalCost) * 100) : 0,
    cost: data.cost,
    hours: data.hours,
    color: data.color,
  }));

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
        Cost Split by Resource Level
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#1A1F26" : "white",
              border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
              borderRadius: "8px",
            }}
            formatter={(value: any, name, props: any) => [
              `${value}%`,
              props.payload.name,
            ]}
          />
        </PieChart>
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
        {chartData.map((item) => (
          <div key={item.name}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "6px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: item.color,
                }}
              />
              <p
                style={{
                  fontWeight: 500,
                  fontSize: "12px",
                  color: darkMode ? "#9CA3AF" : "#6B7280",
                }}
              >
                {item.name}
              </p>
            </div>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: darkMode ? "#F3F4F6" : "#111827",
                marginBottom: "4px",
              }}
            >
              {item.value}%
            </p>
            <p
              style={{
                fontSize: "12px",
                color: darkMode ? "#6B7280" : "#9CA3AF",
              }}
            >
              {item.hours} hours | ${(item.cost / 1000).toFixed(1)}K
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
