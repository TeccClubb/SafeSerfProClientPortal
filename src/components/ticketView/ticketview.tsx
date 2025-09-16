"use client";
import useTicketDetails from "@/lib/hooks/useTicketDetails";
import React, { Suspense, use, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { API_BASE_URL } from "@/lib/utils/apiRoutes";
import { useRouter, useSearchParams } from 'next/navigation';
import useTicketClose from "@/lib/hooks/useTicketClose";

export  function TicketViews() {
    const searchParams = useSearchParams();
    const ticketIdParam = searchParams.get('id'); // You can pass this as a prop instead
    const ticketId = ticketIdParam ? Number(ticketIdParam) : null;
    const { data, loading, error } = useTicketDetails(ticketId as number);
    const { closeTicket, Ticketloading, ticketClose, ticketError } = useTicketClose();
    const [UserMessages, setUserMessages] = useState<any[]>([]);

    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (data && data.messages) {
            setUserMessages(data.messages);
        }
    }
        , [data]);

    const { data: session, status } = useSession(); // add `status` to check if session is loading
    if (loading) return <div className="p-6">Loading ticket...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
    if (!data) return null;
    const router = useRouter();


    const handleReplySubmit = async () => {
        if (!message.trim()) return alert("Please enter a message");
        const token = (session?.user as any)?.access_token;

        const formData = new FormData();
        formData.append("message", message);
        if (file) formData.append("attachments[]", file);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/ticket/${ticketId}/reply`,
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,

                    },
                }
            );

            setUserMessages(response.data.ticket.messages);

            // Optional: Refresh messages or clear fields
            setMessage("");
            setFile(null);
        } catch (error) {
            console.error("Reply submission failed:", error);
        }
    };


    return (
        <div className="min-h-screen bg-[#f9fbfd] p-6">
            <h2 className="text-[20px] font-semibold text-gray-900 mb-5">Open a ticket</h2>

            <div className="bg-white rounded-lg shadow border border-gray-100 p-6 md:p-9 mb-5">
                {/* Top Info Section */}
                <div className="flex justify-end items-center mb-3">
                    <div className="text-gray-500 text-sm flex items-center gap-1">
                        {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        > */}
                            {/* <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg> */}
                        {/* <span className="text-xs">Files</span> */}
                    </div>
                </div>

                {/* Ticket Info and Reply Form */}
                <div className="flex flex-col md:flex-row gap-5 mt-10">
                    {/* Ticket Info */}
                    <div className="w-full md:w-1/3">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Ticket Information</h3>
                        <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
                            <div className="text-sm text-gray-800 space-y-1">
                                <p className="font-semibold text-xl">#{data.id} - {data.subject}</p>
                                <p><span className="text-gray-500">Department:</span> {data.department}</p>
                                <p><span className="text-gray-500">Submitted:</span> {data.created_at}</p>
                                <p><span className="text-gray-500">Contact:</span> {data.name}</p>
                                <p className="flex items-center gap-2">
                                    <span className="text-gray-500">Status:</span>
                                    <span className={`text-white text-xs font-medium px-2 py-0.5 rounded
                      ${data.status === "open" ? "bg-green-500" : "bg-red-500"}`}>
                                        {data.status}
                                    </span>
                                </p>
                                <p><span className="text-gray-500">Priority:</span> {data.priority}</p>
                            </div>
                        </div>
                        <div>
                            {
                                data.status === "open" ? (
                                    <button
                                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={() => closeTicket(data.id)}
                                        disabled={Ticketloading}

                                    >
                                        {Ticketloading ? "Closing..." : "Close Ticket"}
                                    </button>
                                ) : (

                                    ""
                                )
                            }


                        </div>
                    </div>

                    {/* Reply Form */}
                    {
                        (data.status === "open" ? <div className="w-full md:w-3/4">
                            <div className="col-span-2">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Add reply to this ticket</h3>
                                <div className="bg-white rounded-lg shadow border border-gray-100 p-5 flex flex-col h-full min-h-[300px]">
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Write your reply here..."
                                        className="w-full border border-gray-300 bg-slate-100 rounded-md  text-black p-2 h-[150px] text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />

                                    <div className="mb-4">
                                        <label className="text-sm font-bold text-gray-600 mb-1 block">Attachments</label>
                                        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 p-2">
                                            <div className="flex w-full md:w-auto border border-gray-300 rounded-md overflow-hidden">
                                                <input
                                                    type="file"
                                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                                    className="text-sm px-2 py-1 text-black w-full md:w-auto focus:outline-none"
                                                />
                                                <button className="text-sm px-3 py-1 border-l border-gray-300 bg-white w-full md:w-auto">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-100 p-4 rounded mt-auto -mx-5 -mb-5 px-5">
                                        <div className="flex justify-end">
                                            <button
                                                className="px-4 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-900"
                                                onClick={handleReplySubmit}
                                            >
                                                Add Reply
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Ticket is closed</h3>
                            <p className="text-gray-600">You cannot reply to a closed ticket.</p>
                        </div>)
                    }

                </div>

                {/* Ticket Message Section */}
                <div className="flex flex-col md:flex-row gap-5 mt-5">
                    <div className="w-full md:w-1/3"></div>
                    <div className="w-full md:w-3/4">
                        <div className="bg-white rounded-lg shadow border border-gray-100 w-full">
                            <div className="bg-gray-100 rounded-t-md px-6 pt-4 pb-2">
                                <h3 className="font-bold text-gray-800 text-sm">Ticket Chat</h3>
                            </div>
                            <div className="bg-yellow-50 rounded-b-md px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                                {UserMessages?.map((msg: any, index: number) => {
                                    const isAdmin = msg.is_admin === 1;
                                    return (
                                        <div
                                            key={msg.id || index}
                                            className={`flex w-full ${isAdmin ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[75%] rounded-lg px-4 py-2 shadow
                  ${!isAdmin ? 'bg-blue-100 text-right rounded-br-none mr-2' : 'bg-green-100 text-left rounded-bl-none ml-2'}`}
                                            >
                                                <div className="text-xs  text-gray-500 font-medium mb-1">
                                                    {isAdmin ? 'Admin' : "ME"}
                                                </div>
                                                <div className="text-sm text-gray-800">{msg.message}</div>
                                                <div className="text-[11px] text-gray-400 mt-1">{msg.created_at}</div>

                                                {/* Attachments */}
                                                {msg.attachments && msg.attachments.length > 0 && (
                                                    <div className="mt-2">
                                                        {msg.attachments.map((att: any, i: number) => {
                                                            const isImage = att.mime_type?.startsWith("image/");
                                                            return (
                                                                <div key={i} className="mt-1">
                                                                    {isImage ? (
                                                                        <img
                                                                            src={att.url}
                                                                            alt={`attachment-${i}`}
                                                                            className="max-w-[100px] max-h-70 rounded-lg border border-gray-300"
                                                                        />
                                                                    ) : (
                                                                        <a
                                                                            href={att.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-blue-500 underline text-sm"
                                                                        >
                                                                            {att.name || `Attachment ${i + 1}`}
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}


                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    );
}

export default function TicketView(){
     return <div>
        <Suspense>
            <TicketViews />
        </Suspense>
     </div>

}
