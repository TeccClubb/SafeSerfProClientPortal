import TableSection from "../tableSection";

const SubscriptionHistory = () => {
  return (
    <div>

      <TableSection
                     title="Subscription history"
                     
                     searchable
                     pagination
                     columns={['#','Subscription','Details','Paid','Purchase date']}
                     data={[
                         ['#1', 'My super device', '—', 'Paid', '2024-08-01 23:06:18'
                         ]
                     ]}
                     highlightColumns={[0,1]}
                     
                 />
    </div>
  );
};

export default SubscriptionHistory;
