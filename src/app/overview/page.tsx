"use client";
import React, { useEffect } from 'react';
import StatsSection from '@/components/stateSection';
import TableSection from '@/components/tableSection';
import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
import useActivePlan from '@/lib/hooks/useActiveplane';
import { useTicketList } from '@/lib/hooks/useTicket';
import { useRouter } from 'next/navigation';
type Ticket = {
  id: number;
  subject: string;
  status: string;
  priority: string;
  department: string;
  created_at: string;
  messages: {
    id: number;
    user_id: number;
    is_admin: number;
    message: string;
    created_at: string;
    attachments: {
      url: string;
      size: number;
      mime_type: string;
    }[];
  }[];
};

const statsData = [
  { label: 'Tickets', value: 1, color: 'text-red-500 border-red-500 text-sm font-medium' },
  { label: 'Subscriptions', value: 0, color: 'text-green-500 border-green-500 text-sm font-medium' },
  { label: 'Devices', value: 0, color: 'text-blue-500 border-blue-500 text-sm font-medium' },
  { label: 'DNS', value: 29, color: 'text-slate-500 border-indigo-500 text-sm font-medium' },
  { label: 'VPN Servers', value: 253, color: 'text-slate-500 border-purple-500 text-sm font-medium' },
];

export default function Overview() {

  const { data: session, status } = useSession();
  const router = useRouter();
  const token = (session?.user as any)?.access_token;

  const { activePlan, loading: planLoading, error: planError } = useActivePlan();
  const { tickets, loading: ticketsLoading } = useTicketList(token);
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }

  }, [status, router]);
  useEffect(() => {
    console.log("Fetched tickets in component:", tickets);
  }, [tickets]);
  if (status === 'loading') {
    return <div className="text-center mt-20">Checking session...</div>;
  }

  if (planLoading) {
    return <div className="text-center mt-20">Loading subscription...</div>;
  }

  return (
    <div className="p-4 lg:px-20 bg-slate-50 min-h-screen lg:text-sm text-gray-700 space-y-8">
      <StatsSection stats={statsData} />

      <TableSection
        title="Subscriptions"
        actionLabel="+ Upgrade"
        actionLink="/order"
        columns={['Subscription', 'Type', 'Paid', 'Next billing date', 'Purchase date']}
        data={
          activePlan
            ? [[
              activePlan.plan.name,
              activePlan.plan.duration_unit,
              // Connections not available in your current API
              `$${activePlan.amount_paid}`,
              new Date(activePlan.end_date).toLocaleDateString(),
              new Date(activePlan.start_date).toLocaleString()
            ]]
            : []
        }

        highlightColumns={[0]}
      />

      <TableSection
        title="Support Tickets"
        actionLabel="+ Open Ticket"
        actionLink="/createTicket"
        searchable
        pagination
        columns={['Ticket #', 'Subject', 'Contact', 'Department', 'Project', 'Service', 'Priority', 'Status', 'Last Reply']}
        data={
          tickets?.map((ticket, index) => [
            `#${ticket.id || index + 1}`,
            ticket.subject || 'No Subject',
            ticket.contact || 'N/A',
            ticket.department || 'N/A',
            // ticket.project || 'N/A',
            ticket.service || 'N/A',
            ticket.priority || 'N/A',
            <button
              onClick={() => window.location.href = `/ticketView?id=${ticket.id}`}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium text-white hover:opacity-90 transition ${ticket.status === 'open' ? 'bg-green-500' : 'bg-gray-400'
                }`}
            >
              {ticket.status}
            </button>,

            ticket.last_reply ? new Date(ticket.last_reply).toLocaleString() : 'N/A',
          ]) || []
        }
        highlightColumns={[0, 1]}
      />

    </div>
  );
}
