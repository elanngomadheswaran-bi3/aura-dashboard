"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";

import { cn } from "./utils";

// Simplified resizable components since react-resizable-panels API differs
function ResizablePanelGroup({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function ResizablePanel({
  children,
  ...props
}: {
  children?: React.ReactNode;
  [key: string]: any;
}) {
  return <div {...props}>{children}</div>;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: {
  withHandle?: boolean;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </div>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
