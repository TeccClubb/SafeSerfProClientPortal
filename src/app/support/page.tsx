

import StatsSection from "@/components/stateSection";
import TableSection from "@/components/tableSection";
const statsData = [
  { label: 'Open', value: 1, color: 'text-red-500 border-red-500 text-blue-600 text-sm font-medium' },
  { label: 'In Progress', value: 0, color: 'text-green-500 border-green-500 text-sm font-medium' },
  { label: 'Answered', value: 0, color: 'text-blue-500 border-blue-500 text-sm font-medium' },
  { label: 'On Hold', value: 29, color: 'text-slate-500 border-indigo-500 text-sm font-medium' },
  { label: 'Closed', value: 253, color: 'text-sky-500 border-purple-500 text-sm font-medium' },
];
export default function SupportPage(){
    return  <div className="p-3 lg:p-20 bg-slate-50 min-h-screen lg:text-sm   text-gray-700 space-y-8">
         <StatsSection stats={statsData} />

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
}