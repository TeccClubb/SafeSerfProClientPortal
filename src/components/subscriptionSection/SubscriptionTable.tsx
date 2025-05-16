"use client";


import TableSection from "../tableSection";

const SubscriptionTable = () => {
  return (
    <div>
      <TableSection
        title="Subscriptions"
        actionLabel="+ Upgrade"
        columns={['Subscription', 'Type', 'Connections', 'Paid', 'Next billing date', 'Purchase date']}
        data={[
          ['My monthly subscription', 'Monthly', '2', <div className="flex items-center justify-between gap-2">
            <span>'$9.99'</span>
            <button
              onClick={() => console.log('Remove clicked for #1')}
              className="text-white bg-red-600 px-4 border-2 rounded-2xl py-1 hover:underline text-xs"
            >
              Cancel
             
            </button>
          </div>, '2024-08-01', '2024-08-01 23:06:18']
        ]}
        highlightColumns={[0]}
      />
    </div>
  );
};

export default SubscriptionTable;
