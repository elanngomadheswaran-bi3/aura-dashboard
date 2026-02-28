"use client";

import { TeamMember } from "@/data/mockData";
import { formatCurrency } from "@/utils/formatters";
import { useTheme } from "@/app/context/ThemeContext";

interface TeamMembersTableProps {
  teamMembers: TeamMember[];
  hourlyRates?: Record<string, number>;
}

export default function TeamMembersTable({
  teamMembers,
  hourlyRates,
}: TeamMembersTableProps) {
  const { darkMode } = useTheme();

  // Calculate total cost for each member using hourlyRate from teamMembers data
  const memberCosts = teamMembers.map((member) => ({
    ...member,
    totalCost: (member.hourlyRate || 0) * member.totalHours,
  }));

  const sortedMembers = memberCosts.sort((a, b) => b.totalCost - a.totalCost);

  return (
    <div
      style={{
        background: darkMode ? "#1F2937" : "white",
        borderRadius: "12px",
        border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.2fr 1.2fr 1.5fr",
          gap: "16px",
          padding: "16px 24px",
          borderBottom: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
          backgroundColor: darkMode ? "#111827" : "#F9FAFB",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: darkMode ? "#9CA3AF" : "#6B7280",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Team Member
        </div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: darkMode ? "#9CA3AF" : "#6B7280",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Per Hr Cost
        </div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: darkMode ? "#9CA3AF" : "#6B7280",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Hours Logged
        </div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: darkMode ? "#9CA3AF" : "#6B7280",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Total Cost
        </div>
      </div>

      {/* Rows */}
      <div>
        {sortedMembers.map((member, index) => (
          <div
            key={member.id}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.2fr 1.2fr 1.5fr",
              gap: "16px",
              padding: "16px 24px",
              borderBottom:
                index < sortedMembers.length - 1
                  ? `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`
                  : "none",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: darkMode ? "#F3F4F6" : "#111827",
                  marginBottom: "4px",
                }}
              >
                {member.name}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: darkMode ? "#9CA3AF" : "#6B7280",
                }}
              >
                {member.role}
              </p>
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: darkMode ? "#F3F4F6" : "#111827",
              }}
            >
              {formatCurrency(member.hourlyRate)}
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: darkMode ? "#F3F4F6" : "#111827",
              }}
            >
              {member.totalHours}
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#2D6BDB",
              }}
            >
              {formatCurrency(member.totalCost)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
