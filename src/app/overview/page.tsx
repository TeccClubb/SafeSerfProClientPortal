


import React from 'react';
import StatsSection from '@/components/stateSection';
import TableSection from '@/components/tableSection';
import Image from 'next/image';
import Navbar_Below from '@/components/navBar/NavBar2';

const statsData = [
  { label: 'Tickets', value: 1, color: 'text-red-500 border-red-500 text-sm font-medium' },
  { label: 'Subscriptions', value: 0, color: 'text-green-500 border-green-500 text-sm font-medium' },
  { label: 'Devices', value: 0, color: 'text-blue-500 border-blue-500 text-sm font-medium' },
  { label: 'DNS', value: 29, color: 'text-slate-500 border-indigo-500 text-sm font-medium' },
  { label: 'VPN Servers', value: 253, color: 'text-slate-500 border-purple-500 text-sm font-medium' },
];


export default function Overview() {
    return (
        <div className="p-3 lg:p-20 bg-slate-50 min-h-screen lg:text-sm   text-gray-700 space-y-8">

             {/* <Navbar_Below></Navbar_Below> */}
            <StatsSection stats={statsData} />

            <TableSection
                title="Subscriptions"
                actionLabel="+ Upgrade"
                columns={['Subscription', 'Type', 'Connections', 'Paid', 'Next billing date', 'Purchase date']}
                data={[
                    ['My monthly subscription', 'Monthly', '2', '$9.99', '2024-08-01', '2024-08-01 23:06:18']
                ]}
                highlightColumns={[0]}
            />


            <TableSection
                title="Products"
                actionLabel="+ Add Product"
                columns={['#', 'Product', 'Details', 'Paid', 'Purchase date']}
                data={[
                    ['#1', 'My super device', '', '', '2024-08-01 23:06:18']
                ]}
                highlightColumns={[0,1]}
            />

            <TableSection
                title="Support Tickets"
                actionLabel="+ Open Ticket"
                searchable
                pagination
                columns={['Ticket #', 'Subject', 'Contact', 'Department', 'Project', 'Service', 'Priority', 'Status', 'Last Reply']}
                data={[
                    ['#1', 'Issue with production2', 'Test user Super', 'Support', '', '', 'Medium',
                        <span className=" px-2.5 py-1 text-white  bg-green-500 rounded-lg  text-xs font-medium">Open</span>,
                        '2024-08-01 23:06:18'
                    ]
                ]}
                highlightColumns={[0,1]}

            />
        </div>
    );
}
