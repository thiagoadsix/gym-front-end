"use client"

import { ReactNode } from "react";

interface TableContainerProps {
  children: ReactNode
}

export function TableContainer({ children }: TableContainerProps) {
  return (
    <div className="overflow-auto rounded-lg shadow">{children}</div>
  );
};
