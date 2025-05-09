import React from 'react';
import { JSX } from 'react/jsx-runtime';

interface TableSectionProps {
    title: string;
    actionLabel: string;
    columns: string[];
    data: (string | JSX.Element)[][];
    searchable?: boolean;
    pagination?: boolean;
    highlightColumns?: number[];
}

export default function TableSection({
    title,
    actionLabel,
    columns,
    data,
    searchable,
    pagination,
    highlightColumns = [], // Default to an empty array if not provided 
}: TableSectionProps) {
    return (
        <div className="space-y-2">
            {/* text-slate-700 text-lg font-semibold */}
            <div className="flex justify-between pb-3 items-center">
                <h2 className="text-slate-700 text-lg font-semibold">{title}</h2>
                <button
                    className={`${actionLabel === "+ Upgrade"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-blue-600 hover:bg-blue-700"
                        } text-white  px-3 py-1.5 rounded text-xs  leading-tight`}
                >
                    {actionLabel}
                </button>

            </div>


            <div className=' bg-white rounded-md p-6 outline-1 outline-offset-[-1px] outline-slate-200'>
                {searchable && (
                    <div className="p-4 flex flex-col sm:flex-row sm:justify-between gap-3">
                        <div>
                            <input
                                type="text"
                                placeholder="25"
                                className="border border-neutral-200 rounded px-2 py-1 text-sm w-full sm:w-20"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-neutral-200 rounded px-2 py-1 text-sm w-full sm:w-48"
                        />
                    </div>
                )}

                <div className="overflow-x-auto bg-white rounded    ">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                {columns.map((col, i) => (
                                    <th
                                        key={i}
                                        className="p-2 text-gray-600 text-sm font-medium bg-slate-50 leading-tight min-w-[120px]"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, i) => (
                                <tr key={i}>
                                    {row.map((cell, j) => (
                                        <td
                                            key={j}
                                            className={`p-2 pt-3   ${highlightColumns?.includes(j) ? "text-blue-600 font-medium" : ""
                                                }`}
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}

                        </tbody>
                    </table>



                    {pagination && (
                        <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-2">
                            {/* Hide this text on small screens */}
                            <p className="hidden sm:block">
                                Showing 1 to {data.length} of {data.length} entries
                            </p>

                            {/* Always show the pagination buttons */}
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1 border border-gray-200 rounded bg-gray-100 hover:bg-gray-200">
                                    Previous
                                </button>
                                <span className="px-3 py-1 border rounded bg-blue-500 text-white">1</span>
                                <button className="px-3 py-1 border border-gray-200 rounded bg-gray-100 hover:bg-gray-200">
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                </div>

            </div>


        </div>
    );
}
