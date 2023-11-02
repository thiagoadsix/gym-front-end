"use strict";

interface TableHeaderProps {
  columns: string[];
}

export function TableHeader({ columns }: TableHeaderProps) {
  return (
    <thead className="bg-zinc-200 border-b-2 border-zinc-200">
      <tr>
        {columns.map((column, index) => (
          <th key={index} className="p-3 text-sm font-semibold tracking-wide text-left">
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};