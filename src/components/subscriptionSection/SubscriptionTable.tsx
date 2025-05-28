"use client";


import useActivePlan from "@/lib/hooks/useActiveplane";
import TableSection from "../tableSection";
import { useSelector } from "react-redux";
import { PLANS_PAGE_PATH } from "@/lib/pathname";

const SubscriptionTable = () => {

    const { activePlan, loading: planLoading, error: planError } = useActivePlan();

  return (
    <div>
     
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
                   // Connections not available in your current API
                   `$${activePlan.amount_paid}`,
                   new Date(activePlan.end_date).toLocaleDateString(),
                   new Date(activePlan.start_date).toLocaleString()
                 ]]
                 : []
             }
     
             highlightColumns={[0]}
           />
    </div>
  );
};

export default SubscriptionTable;
