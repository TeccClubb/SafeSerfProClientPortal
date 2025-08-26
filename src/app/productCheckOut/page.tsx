// import { Plan } from "@/hooks/usePlans";
// import { Plan } from "@/hooks/usePlans";
"use client";

import VpnPlanTable from "@/components/VpnPlanTable";
import CheckoutForm from "@/components/payment/checkoutForm";
import { OrderSummaryCard } from "@/components/OrderSummaryCard";
import Image from "next/image";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePlans } from "@/lib/hooks/usePlans";
// import { usePlans } from "@/hooks/usePlans";
// adjust if file path is different
// import { Plan } from "@/hooks/usePlans";
import { Plan } from "@/lib/hooks/usePlans";
import { useSession } from "next-auth/react";

function ProductConfigurationCheckOut() {
  const router = useRouter();
  const { data: session } = useSession();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [showSummary, setShowSummary] = useState(true);
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  const numericPlanId = planId ? parseInt(planId, 10) : null;

  const storePlans = useSelector((state: RootState) => state.plan.plans);
  const selectedPlan = useSelector((state: RootState) => state.plan.selectedPlan);

  const { plans: fetchedPlans, loading } = usePlans();
  const originalPrice = parseFloat(plan?.original_price || "0");
  const discountPrice = parseFloat(plan?.discount_price || "0");

  // Total amount the user will pay
  const amountPaid = discountPrice;

  // How much discount (absolute value)
  const discountAmount = originalPrice - discountPrice;

  // Discount percentage
  const discountPercent = Math.round((discountAmount / originalPrice) * 100);

  // VAT if applicable (set to 0 or calculate if you have the logic)
  const vat = 0;

  useEffect(() => {
    if (!numericPlanId) return;

    const allPlans = storePlans.length ? storePlans : fetchedPlans;
    const foundPlan = allPlans.find((p) => p.id === numericPlanId);
    setPlan(foundPlan ?? null);
  }, [storePlans, fetchedPlans, numericPlanId]);

  //   if (!planId || (!plan && !loading)) return notFound();
  if (!plan) return <div className="p-4">Loading plan...</div>;
  if (!planId) return notFound();

  // Table Data
  const tableData = [
    [
      <span key={`product-${plan.id}`} className="text-blue-600 hover:underline">
        {plan.name}
      </span>,
      <div key={`details-${plan.id}`} className="space-y-1">
        {plan.features?.map((feature: any, i: number) => {
          const isEnabled = feature.enabled === 1;
          return (
            <div
              key={i}
              className={`flex items-center gap-2 ${isEnabled ? 'text-green-600' : 'text-red-500 line-through'}`}
            >
              <Image
                src={isEnabled ? "/products/tickIcon.png" : "/products/crossIcon.png"}
                width={17}
                height={17}
                alt={isEnabled ? "tickIcon" : "crossIcon"}
              />
              <span className="text-gray-700">{feature.label || feature.title}</span>
            </div>
          );
        })}
      </div>,
      <div key={`config-${plan.id}`} className="space-y-2">
        <select className="border rounded px-2 py-1">
          <option>{`${plan.duration} ${plan.duration_unit}`}</option>
        </select>
      </div>,
    ],
  ];
  return (
    <div className="mt-8 mx-auto bg-slate-50 min-h-screen">
      <div className="p-4 max-w-7xl mx-auto lg:text-sm text-gray-700 space-y-8">
        {/* <div>
        <h1 className="text-slate-700 text-lg font-semibold">Product Configuration</h1>
      </div>

      <div className="bg-white p-4">
        <VpnPlanTable
          title="VPN Plans Overview"
          columns={["Product", "Details", "Configuration"]}
          data={tableData}
          showRemoveBtn={true}
          onRemove={(index) =>  router.push(`/plans`)}

        />
      </div> */}

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left */}
          <div className="w-full lg:w-4/7 p-4 rounded">
            <h2 className="text-2xl font-bold mb-2">Logged-in</h2>

            <div className="w-full px-4 py-4 border border-[#222E3A1A] rounded flex flex-col mb-4">
              <span className="text-[#90969C] text-xs ">Email Address</span>
              {session?.user?.email}
            </div>

            <h2 className="text-lg font-semibold mb-2">Payment section</h2>
           <CheckoutForm
  planId={plan.id}
  amount={Math.round(((parseFloat(plan.original_price ?? "0")) - (parseFloat(plan.discount_price ?? "0"))) * 100)}
  className="w-full"
/>

          </div>

          {/* Right */}
          <div className="w-full lg:w-3/7 px-8 py-4 rounded">
            <div className="flex items-center justify-end gap-2 my-4 mr-4">
              <img src="/30-days.svg" alt="" />
              <span className="text-base leading-5 font-medium">Money-back <br /> guarantee</span>
            </div>

            <OrderSummaryCard
              total={discountAmount.toFixed(2)}
              vat="0.00" // If you don’t have VAT info from API
              country="Germany"
              basePrice={amountPaid.toFixed(2)}
              originalPrice={originalPrice.toFixed(2)}
              discountText={`${discountPercent}% OFF`}
              monthsExtra={`${plan.duration} ${plan.duration_unit}${plan.duration > 1 ? 's' : ''}`}
              couponCode="SAVE30" // Optional: get from API if available
              addons={[
                { name: "Extra Security", added: true, image: "/products/dosprotection.png" },
                { name: "Premium Support", added: false, image: "/products/extradevice.png" },
                { name: "Cloud Backup", added: false, image: "/products/ipaddress.png" },
              ]}
              image="/products/dosprotection.png"
              onApplyCoupon={(code) => console.log("Applying coupon:", code)}
              onRemoveCoupon={() => console.log("Removing coupon")}
            />

          </div>
        </div>
      </div>
    </div>

  );
}

const ProductConfigPage = () => (
  <Suspense>
    <ProductConfigurationCheckOut />
  </Suspense>
);

export default ProductConfigPage;
