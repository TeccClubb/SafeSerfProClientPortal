"use client";

import VpnPlanTable from "@/components/VpnPlanTable";
import CheckoutForm from "@/components/payment/checkoutForm";
import { OrderSummaryCard } from "@/components/OrderSummaryCard";
import Image from "next/image";
import { notFound, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function ProductConfigurationCheckOut() {
    const [showSummary, setShowSummary] = useState(true);
    const searchParams = useSearchParams();
    const planId = searchParams.get("planId");

    const plans = useSelector((state: RootState) => state.plan.plans);
    const selectedPlan = useSelector((state: RootState) => state.plan.selectedPlan);

    if (!planId) return notFound();

    const numericPlanId = parseInt(planId, 10);
    const plan = plans.find((p) => p.id === numericPlanId);

    if (!plan) return notFound();

    useEffect(() => {
        console.log("Selected Plan:", selectedPlan);
    }, [selectedPlan]);

    // ✅ Convert features array into your current table format
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
                <span className="text-gray-700">
                    {feature.label || feature.title}
                </span>
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
        <div className="p-4 lg:px-20 bg-slate-50 min-h-screen lg:text-sm text-gray-700 space-y-8">
            <div>
                <h1 className="text-slate-700 text-lg font-semibold">Product Configuration</h1>
            </div>

            <div className="bg-white p-4">
                <VpnPlanTable
                    title="VPN Plans Overview"
                    columns={["Product", "Details", "Configuration"]}
                    data={tableData}
                    showRemoveBtn={true}
                    onRemove={(index) => console.log("Remove row", index)}
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                {/* Left */}
                <div className="w-full lg:w-1/2 bg-white p-4 shadow rounded">
                    <h2 className="text-lg font-semibold mb-2">Payment section</h2>
                    <CheckoutForm
                        planId={plan.id}
                        amount={+(plan.original_price ?? 0) * 100}
                        className="w-full lg:w-2/3"
                    />
                </div>

                {/* Right */}
                <div className="w-full lg:w-1/2 bg-white p-4 shadow rounded">
                    <OrderSummaryCard
                        total="64.56"
                        vat="12.00"
                        country="Germany"
                        basePrice="52.56"
                        originalPrice="129.00"
                        discountText="60%"
                        monthsExtra="3 months"
                        couponCode="SAVE60"
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
    );
}

const Page = () => (
    <Suspense>
        <ProductConfigurationCheckOut />
    </Suspense>
);

export default Page;
