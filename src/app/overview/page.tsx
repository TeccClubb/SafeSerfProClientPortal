"use client";
import React, { useEffect } from 'react';
import StatsSection from '@/components/stateSection';
import TableSection from '@/components/tableSection';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useActivePlan from '@/lib/hooks/useActiveplane';

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
  const { activePlan, loading: planLoading, error: planError } = useActivePlan();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

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
        columns={['Subscription', 'Type', 'Connections', 'Paid', 'Next billing date', 'Purchase date']}
        data={
          activePlan?.plan
            ? [[
                activePlan.plan.name,
                activePlan.plan.billing_cycle,
                `${activePlan.plan.connections}`,
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
        data={[
          ['#1', 'Issue with production2', 'Test user Super', 'Support', '', '', 'Medium',
            <span className="px-2.5 py-1 text-white bg-green-500 rounded-lg text-xs font-medium">Open</span>,
            '2024-08-01 23:06:18']
        ]}
        highlightColumns={[0, 1]}
      />
    </div>
  );
}
