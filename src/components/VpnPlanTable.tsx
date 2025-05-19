// components/VpnPlanTable.tsx
import React from 'react';

type VpnPlanTableProps = {
  title?: string;
  columns: string[];
  data: React.ReactNode[][];
  showRemoveBtn?: boolean;
  onRemove?: (rowIndex: number) => void;
};

const VpnPlanTable: React.FC<VpnPlanTableProps> = ({
  title,
  columns,
  data,
  showRemoveBtn = false,
  onRemove,
}) => {
  return (
    <div className="w-full overflow-x-auto p-4">
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}

      <div className="min-w-[600px] lg:min-w-full"> {/* <-- controls min table width */}
        <table className="w-full text-sm bg-white    ">
          <thead className="bg-slate-100 text-left">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 font-semibold text-gray-700 whitespace-nowrap border-l border-slate-300"
                >
                  {col}
                </th>
              ))}
              {showRemoveBtn && (
                <th className="px-6 py-3 font-semibold text-gray-700 whitespace-nowrap">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="px-6 py-4 align-top break-words whitespace-normal"
                  >
                    {cell}
                  </td>
                ))}
                {showRemoveBtn && (
                  <td className="px-6 align-text-top py-4">
                    <button
                      onClick={() => onRemove?.(rowIdx)}
                      className="bg-red-500 rounded-lg text-white py-1 px-3"
                    >
                      Remove
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VpnPlanTable;
