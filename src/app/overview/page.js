


import React from 'react';
import StatsSection from '@/components/stateSection';
import TableSection from '@/components/tableSection';
import Image from 'next/image';


export default function Overview() {
    return (
        <div className="p-3 lg:p-20 bg-slate-50 min-h-screen lg:text-sm   text-gray-700 space-y-8">

            <div className="flex gap-7 justify-end items-center">
                <div className="flex items-center gap-1 text-gray-700">
                    <Image src="/overview/device.png" alt="device" width={20} height={20}>

                    </Image>
                    <span className='text-slate-600 text-base font-normal'>Devices</span>
                </div>

                <div className="flex items-center gap-1 text-gray-700">
                    <Image src="/overview/dnsserver.png" alt="device" width={20} height={20}>

                    </Image>
                    <span className='text-slate-600 text-base font-normal'>Smart DNS</span>
                </div>

                <div className="flex items-center gap-1 text-gray-700">
                    <Image src="/overview/vpncrediental.png" alt="device" width={20} height={20}>

                    </Image>
                    <span className='text-slate-600 text-base font-normal'>VPN Credential</span>
                </div>
            </div>
            <StatsSection />

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
