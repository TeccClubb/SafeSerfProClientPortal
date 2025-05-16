"use client"
import TableSection from "@/components/tableSection"
export default function Devicespage() {

  return <div className="p-3 lg:p-20 bg-slate-50 min-h-screen lg:text-sm   text-gray-700 space-y-8">

    <TableSection
      title="My devices"
      actionLabel="+ Add more Devices"
      searchable
      pagination
      columns={['Ticket #', 'Devices', 'Last Reply']}
      data={[
        [
          '#1',
          <div className="flex items-center justify-between gap-2">
            <span>Issue with production2</span>
            <button
              onClick={() => console.log('Remove clicked for #1')}
              className="text-white bg-red-600 px-4 border-2 rounded-2xl py-2 hover:underline text-xs"
            >
              Remove
            </button>
          </div>,
          '2024-08-01 23:06:18',
        ],
      ]}
      removeBtn
      highlightColumns={[0, 1]}
    />

  </div>
}