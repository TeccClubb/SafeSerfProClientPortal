import TableSection from "../tableSection";

const SubscriptionTable = () => {
    return (
      <div>
        <TableSection
                title="Subscriptions"
                actionLabel="+ Upgrade"
                columns={['Subscription', 'Type', 'Connections', 'Paid', 'Next billing date', 'Purchase date']}
                data={[
                    ['My monthly subscription', 'Monthly', '2', '$9.99', '2024-08-01', '2024-08-01 23:06:18']
                ]}
                highlightColumns={[0]}
            />
      </div>
    );
  };
  
  export default SubscriptionTable;
  