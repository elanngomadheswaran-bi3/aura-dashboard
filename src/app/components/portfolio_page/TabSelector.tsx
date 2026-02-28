"use client";

interface TabSelectorProps {
  tabs: Array<{
    id: string;
    label: string;
    count?: number;
  }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabSelector({
  tabs,
  activeTab,
  onTabChange,
}: TabSelectorProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        marginBottom: "32px",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: activeTab === tab.id ? 600 : 500,
            color: activeTab === tab.id ? "#2D6BDB" : "#6B7280",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            position: "relative",
            transition: "color 0.2s",
            borderBottom:
              activeTab === tab.id
                ? "2px solid #2D6BDB"
                : "2px solid transparent",
            marginBottom: "-1px",
          }}
          onMouseEnter={(e) => {
            if (activeTab !== tab.id) {
              e.currentTarget.style.color = "#111827";
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== tab.id) {
              e.currentTarget.style.color = "#6B7280";
            }
          }}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              style={{
                marginLeft: "8px",
                fontSize: "12px",
                color: activeTab === tab.id ? "#2D6BDB" : "#9CA3AF",
              }}
            >
              ({tab.count})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
