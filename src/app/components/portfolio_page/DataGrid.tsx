"use client";

import { ReactNode } from "react";

export interface DataGridProps<T> {
  title: string;
  subtitle?: string;
  items: T[];
  renderCard: (item: T, index: number) => ReactNode;
  minWidth?: string;
  gap?: string;
  onTitleClick?: () => void;
  controls?: ReactNode;
}

export default function DataGrid<T>({
  title,
  subtitle,
  items,
  renderCard,
  minWidth = "250px",
  gap = "20px",
  onTitleClick,
  controls,
}: DataGridProps<T>) {
  return (
    <div style={{ marginBottom: "48px" }} className="w-9/10">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div
          style={{ cursor: onTitleClick ? "pointer" : "default" }}
          onClick={onTitleClick}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "8px",
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: "14px", color: "#6B7280" }}>{subtitle}</p>
          )}
        </div>

        {controls && <div>{controls}</div>}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
          gap,
        }}
      >
        {items.map((item, index) => renderCard(item, index))}
      </div>
    </div>
  );
}
