"use client";
import React, { useEffect, useState } from 'react';
import StatsSection from '@/components/stateSection';
import TableSection from '@/components/tableSection';
import { useSession } from 'next-auth/react';
import useActivePlan from '@/lib/hooks/useActiveplane';

// import useUserStats from '@/lib/hooks/useUserStats';

import { useTicketList } from '@/lib/hooks/useTicket';
import { useRouter } from 'next/navigation';
import { CREATE_TICKET_PAGE_PATH, PLANS_PAGE_PATH } from '@/lib/pathname';
import useUserStats from '@/lib/hooks/useUserStats';
 

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

export default function Overview() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const token = (session?.user as any)?.access_token;

  const { activePlan, loading: planLoading } = useActivePlan();
  const { tickets, loading: ticketsLoading } = useTicketList(token);
    
const { userStats, loading, error } = useUserStats();
  const [ticketCount, setTicketCount] = useState<number>(0);

  useEffect(() => {
   
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (tickets && Array.isArray(tickets)) {
      setTicketCount(tickets.length);
    }
  }, [tickets]);

  if (status === 'loading') {
    return <div className="text-center mt-20">Checking session...</div>;
  }

  // if (planLoading) {
  //   return <div className="text-center mt-20">Loading subscription...</div>;
  // }

  const statsData = [
    { label: 'Tickets', value: userStats?.tickets ?? 0, color: 'text-red-500 border-red-500 text-sm font-medium' },
    { label: 'Subscriptions', value: userStats?.purchases??0, color: 'text-green-500 border-green-500 text-sm font-medium' },
    { label: 'Devices', value: 0, color: 'text-blue-500 border-blue-500 text-sm font-medium' },
    { label: 'DNS', value: 4, color: 'text-slate-500 border-indigo-500 text-sm font-medium' },
    { label: 'VPN Servers',value: userStats?.servers??0, color: 'text-slate-500 border-purple-500 text-sm font-medium' },
  ];

  return (
    <div className="p-4 lg:px-20 bg-slate-50 min-h-screen lg:text-sm text-gray-700 space-y-8">
      <StatsSection stats={statsData} />

      <TableSection
        title="Subscriptions"
        actionLabel="+ Upgrade"
        actionLink={PLANS_PAGE_PATH}
        columns={['Subscription', 'Type', 'Paid', 'Next billing date', 'Purchase date']}
        data={
          activePlan
            ? [[
              activePlan.plan.name,
              activePlan.plan.duration_unit,
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
        actionLink={CREATE_TICKET_PAGE_PATH}
        searchable
        pagination
        columns={['Ticket #', 'Subject', 'Contact', 'Department', 'Project', 'Service', 'Priority', 'Status', 'Last Reply']}
       data={
  tickets?.map((ticket, index) => [
    // Clickable Ticket ID
    <a
      href={`/ticketView?id=${ticket.id}`}
      className="text-blue-600 hover:underline"
    >
      #{ticket.id || index + 1}
    </a>,

    // Clickable Subject
    <a
      href={`/ticketView?id=${ticket.id}`}
      className="text-blue-600 hover:underline"
    >
      {ticket.subject || 'No Subject'}
    </a>,

    ticket.contact || 'N/A',
    ticket.department || 'N/A',
    ticket.porject || 'N/A',
    ticket.service || 'N/A',
    ticket.priority || 'N/A',

    // Status button
    <button
      onClick={() => window.location.href = `/ticketView?id=${ticket.id}`}
      className={`px-3 py-1 rounded-lg text-xs font-medium text-white hover:opacity-90 transition ${ticket.status === 'open' ? 'bg-green-500' : 'bg-red-500'}`}
    >
      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}

    </button>,

    // Last reply
    ticket.messages[0]?.created_at
      ? new Date(ticket.messages[0]?.created_at).toLocaleString()
      : 'N/A',
  ]) || []
}

        highlightColumns={[0, 1]}
      />
    </div>
  );
}
