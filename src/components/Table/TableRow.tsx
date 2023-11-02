"use strict";

interface TableRowProps {
  data: any
}

export function TableRow({ data }: TableRowProps) {
  return (
    <tr className="bg-zinc-50">
      {Object.values(data).map((value: any, index) => (
        <td key={index} className="p-3 text-sm text-zinc-700 whitespace-nowrap">
          {value}
        </td>
      ))}
    </tr>
  );
};