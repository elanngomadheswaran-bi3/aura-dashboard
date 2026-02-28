import { AlertCircle, ChevronDown } from "lucide-react";

interface SortFilterControlsProps {
  sortBy: "variance" | "cost" | "client" | "status";
  showAtRisk: boolean;
  sortOpen: boolean;
  onSortChange: (sort: "variance" | "cost" | "client" | "status") => void;
  onSortOpenChange: (open: boolean) => void;
  onAtRiskToggle: (show: boolean) => void;
}

export default function SortFilterControls({
  sortBy,
  showAtRisk,
  sortOpen,
  onSortChange,
  onSortOpenChange,
  onAtRiskToggle,
}: SortFilterControlsProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
      }}
    >
      {/* Sort Dropdown */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => onSortOpenChange(!sortOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            background: "white",
            border: "1px solid #E5E7EB",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            color: "#6B7280",
          }}
        >
          Sort
          <ChevronDown className="w-4 h-4" />
        </button>

        {sortOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "8px",
              width: "200px",
              background: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
              zIndex: 10,
            }}
          >
            {[
              { value: "variance" as const, label: "By Variance" },
              { value: "cost" as const, label: "By Cost" },
              { value: "client" as const, label: "By Client" },
              { value: "status" as const, label: "By Status" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  onSortOpenChange(false);
                }}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  textAlign: "left",
                  background:
                    sortBy === option.value ? "#F3F4F6" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: sortBy === option.value ? "#2D6BDB" : "#6B7280",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (sortBy !== option.value) {
                    e.currentTarget.style.backgroundColor = "#F9FAFB";
                  }
                }}
                onMouseLeave={(e) => {
                  if (sortBy !== option.value) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* At Risk Filter */}
      <button
        onClick={() => onAtRiskToggle(!showAtRisk)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          background: showAtRisk ? "#FEE2E2" : "white",
          border: `1px solid ${showAtRisk ? "#DC2626" : "#E5E7EB"}`,
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          color: showAtRisk ? "#DC2626" : "#6B7280",
          transition: "all 0.2s",
        }}
      >
        <AlertCircle className="w-4 h-4" />
        At Risk
      </button>
    </div>
  );
}
