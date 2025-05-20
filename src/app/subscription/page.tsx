
import SubscriptionTable from "@/components/subscriptionSection/SubscriptionTable";
import SubscriptionPlans from "@/components/subscriptionSection/SubscriptionPlans";
import SubscriptionHistory from "@/components/subscriptionSection/SubscriptionHistory";


export default function SubscriptionPage() {
  return (
            <div className="p-4 lg:px-20 bg-slate-50 min-h-screen lg:text-sm   text-gray-700 space-y-8">


   
 
      <SubscriptionTable />
      <SubscriptionPlans />
  
    </div>
  );
}
