
import SubscriptionTable from "@/components/subscriptionSection/SubscriptionTable";
import SubscriptionPlans from "@/components/subscriptionSection/SubscriptionPlans";
import SubscriptionHistory from "@/components/subscriptionSection/SubscriptionHistory";


export default function SubscriptionPage() {
  return (
    <div className="font-geist-sans bg-gray-100 min-h-screen w-full">

   
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6 bg-gray-100 min-h-screen">
      <SubscriptionTable />
      <SubscriptionPlans />
      <SubscriptionHistory />
    </main>
    </div>
  );
}
