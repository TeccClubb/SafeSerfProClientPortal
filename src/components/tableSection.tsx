"use client"
import React, { useState, useMemo } from 'react';
import { JSX } from 'react/jsx-runtime';
import { useRouter } from 'next/navigation';

interface TableSectionProps {
    title: string;
    actionLabel?: string;
    actionLink?: string;
    columns: string[];
    data: (string | JSX.Element)[][];
    searchable?: boolean;
    pagination?: boolean;
    highlightColumns?: number[];
    removeBtn?: boolean;
    customCellRender?: (rowIndex: number, colIndex: number, cellValue: string | JSX.Element) => JSX.Element | string;
}

export default function TableSection({
    title,
    actionLabel,
    actionLink,
    columns,
    data,
    searchable,
    pagination,
    removeBtn,
    customCellRender,
    highlightColumns = [],
}: TableSectionProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    // Filter data by searchTerm on any cell's text content
    const filteredData = useMemo(() => {
        if (!searchable || !searchTerm.trim()) return data;

        const lowerSearchTerm = searchTerm.toLowerCase();

        return data.filter(row =>
            row.some(cell => {
                // If cell is JSX.Element, extract text by rendering or use alternative method,
                // but here we'll convert to string simply
                const cellText = typeof cell === 'string'
                    ? cell.toLowerCase()
                    : (cell.props?.children ?? '').toString().toLowerCase();

                return cellText.includes(lowerSearchTerm);
            })
        );
    }, [data, searchTerm, searchable]);

    return (
        <div className="space-y-2">
            <div className="flex justify-between pb-3 items-center">
                <h2 className="text-slate-700 text-lg font-semibold">{title}</h2>

                {actionLabel && actionLink && (
                    <button
                        onClick={() => router.push(actionLink)}
                        className={`${actionLabel === "+ Upgrade"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-blue-600 hover:bg-blue-700"
                            } text-white px-3 py-1.5 rounded text-xs`}
                    >
                        {actionLabel}
                    </button>
                )}
            </div>

            <div className='bg-white rounded-md p-6 outline-1 outline-offset-[-1px] outline-slate-200'>
                {searchable && (
                    <div className="p-4 flex flex-col sm:flex-row sm:justify-between gap-3">
                        <div>
                            <select
                                className="border border-neutral-200 rounded px-2 py-1 text-sm w-full sm:w-20"
                                defaultValue=""
                            >
                                <option value="" disabled>25</option>
                                <option value="50">50</option>
                                <option value="75">75</option>
                                <option value="100">100</option>
                            </select>
                        </div>

                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-neutral-200 rounded px-2 py-1 text-sm w-full sm:w-48"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                )}

                <div className="overflow-x-auto bg-white rounded">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                {columns.map((col, i) => (
                                    <th
                                        key={i}
                                        className={`p-2 text-slate-500 text-sm font-semibold bg-slate-50 leading-tight min-w-[120px] ${i !== 0 ? 'border-l border-slate-200' : ''}`}
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((row, i) => (
                                    <tr key={i}>
                                        {row.map((cell, j) => (
                                            <td
                                                key={j}
                                                className={`p-2 pt-3 ${highlightColumns.includes(j) ? "text-blue-600 font-normal" : "text-slate-500"}`}
                                            >
                                                {customCellRender
                                                    ? customCellRender(i, j, cell)
                                                    : cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="text-center p-4 text-gray-400">
                                        No results found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {pagination && (
                        <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-2">
                            <p className="hidden sm:block">
                                Showing 1 to {filteredData.length} of {filteredData.length} entries
                            </p>
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
