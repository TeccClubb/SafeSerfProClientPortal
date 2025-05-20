"use client";
import TableSection from "@/components/tableSection";
import Link from "next/link";
import { JSX } from "react";

export default function CreateTicketPage() {
  const tickets = [
   
    {
      id: "#2",
      subject: "Unable to access dashboard",
      contact: "Jane Doe",
      department: "Technical",
      project: "Internal Tool",
      service: "DevOps",
      priority: "High",
      status: "Close",
      lastReply: "2024-08-05 10:12:45",
    },
  ];

  const tableData = tickets.map((ticket) => [
    ticket.id,
    ticket.subject,
    ticket.contact,
    ticket.department,
    ticket.project,
    ticket.service,
    ticket.priority,
    <span
      className={`px-2.5 py-1 text-white rounded-lg text-xs font-medium ${
        ticket.status === "Open" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {ticket.status}
    </span>,
    ticket.lastReply,
  ]);

  // ✅ Custom render to make ID and Subject clickable
  const customCellRender = (
    rowIndex: number,
    colIndex: number,
    cellValue: string | JSX.Element
  ) => {
    const ticketId = tickets[rowIndex].id.replace("#", ""); // remove # for clean URL
    if (colIndex === 0 || colIndex === 1) {
      return (
        <Link
          href={`/tickets/${ticketId}`}
          className="hover:underline text-blue-600"
        >
          {cellValue}
        </Link>
      );
    }
    return cellValue;
  };

  return (
    <div className="p-4 lg:px-20 bg-slate-50 min-h-screen text-slate-900 space-y-8">
      <h2 className="text-lg font-bold text-slate-600">Open a ticket</h2>

      <div className="bg-white p-4">
        <TableSection
          title="Support Ticket"
          actionLabel="+ Open Ticket"
          searchable
          pagination
          columns={[
            "Ticket #",
            "Subject",
            "Contact",
            "Department",
            "Project",
            "Service",
            "Priority",
            "Status",
            "Last Reply",
          ]}
          data={tableData}
          highlightColumns={[0, 1]}
          customCellRender={customCellRender}
        />
      </div>
    </div>
  );
}
