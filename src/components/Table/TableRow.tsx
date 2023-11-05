"use strict";

interface TableRowProps {
  data: any
  onClick: (data: any) => void;
}

export function TableRow({ data, onClick }: TableRowProps) {
  return (
    <tr className="bg-zinc-50">
      {Object.values(data).map((value: any, index) => (
        <td key={index} className="p-3 text-sm text-zinc-700 whitespace-nowrap cursor-pointer" onClick={() => onClick(data)}>
          {value}
        </td>
      ))}
    </tr>
  );
};