import React from "react";

export default function TicketView() {
    return (
        <div>
            <div className="min-h-screen bg-[#f9fbfd] p-6">
                <h2 className="text-[15px] font-semibold text-gray-900 mb-5">Open a ticket</h2>

                <div className="bg-white rounded-lg shadow border border-gray-100 p-6 md:p-9 mb-5">
                    <div className="flex justify-end items-center mb-3">
                        <div className="text-gray-500 text-sm flex items-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-xs">Files</span>
                        </div>

                    </div>
                    {/* Top Section: Ticket Info + Reply */}
                    <div className="flex flex-col md:flex-row gap-5 mt-14">
                        {/* Ticket Info */}
                        <div className="w-full md:w-1/3">
                            <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Ticket Information</h3>
                            <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
                                <div className="text-sm text-gray-800 space-y-1">
                                    <p className="font-medium">#6 - Issue with the VPN</p>
                                    <p><span className="text-gray-500">Department:</span> Marketing</p>
                                    <p><span className="text-gray-500">Submitted:</span> 2025-05-08 16:06:59</p>
                                    <p><span className="text-gray-500">Contact:</span> Otis Schamberger</p>
                                    <p className="flex items-center gap-2">
                                        <span className="text-gray-500">Status:</span>
                                        <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded">Open</span>
                                    </p>
                                    <p><span className="text-gray-500">Priority:</span> Medium</p>
                                </div>
                            </div>
                        </div>

                        {/* Reply Form */}
                        <div className="w-full md:w-3/4">
                            <div className="col-span-2">
                                <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Add reply to this ticket</h3>
                                <div className="bg-white rounded-lg shadow border border-gray-100 p-5 flex flex-col h-full min-h-[300px]">
                                    <textarea
                                        placeholder=""
                                        className="w-full border border-gray-300 rounded-md p-2 h-[150px] text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    ></textarea>

                                    <div className="mb-4">
                                        <label className="text-sm font-bold text-gray-600 mb-1 block">Attachments</label>

                                        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 p-2">
                                            <div className="flex w-full md:w-auto border border-gray-300 rounded-md overflow-hidden">
                                                <input
                                                    type="file"
                                                    className="text-sm px-2 py-1 w-full md:w-auto focus:outline-none"
                                                />
                                                <button
                                                    className="text-sm px-3 py-1 border-l border-gray-300 bg-white w-full md:w-auto"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    {/* Sticky to bottom of parent */}
                                    <div className="bg-gray-100 p-4 rounded mt-auto -mx-5 -mb-5 px-5">
                                        <div className="flex justify-end">
                                            <button className="px-4 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-900">
                                                Add Reply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ticket Message Section */}
                    <div className="flex flex-col md:flex-row gap-5 mt-5">
                        <div className="w-full md:w-1/3">
                            {/* Placeholder or additional content */}
                        </div>
                        <div className="w-full md:w-3/4">
                            <div className="bg-white rounded-lg shadow border border-gray-100 w-full">
                                <div className="bg-gray-100 rounded-t-md px-6 pt-4 pb-2">
                                    <h3 className="font-bold text-gray-800 text-sm">Ticket</h3>
                                </div>
                                <div className="bg-yellow-50   rounded-b-md px-6 py-4 grid grid-cols-1 md:grid-cols-2">
                                    <div className="text-sm text-gray-800 space-y-1">
                                        <div className="font-semibold text-gray-700">Otis Schamberger</div>
                                    </div>
                                    <div className="flex flex-col justify-between text-sm text-gray-800">
                                        <p>I have an issue</p>
                                        <p className="text-gray-400 text-xs mt-1">------------------------------</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
