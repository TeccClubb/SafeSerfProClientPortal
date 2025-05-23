// app/product/page.tsx (or similar)
"use client";

import VpnPlanTable from "@/components/VpnPlanTable";
import ProductList from "@/components/product/ProductList";
import Summary from "@/components/product/Summary";
import AddProductButton from "@/components/product/AddProductButton";
import { ChevronDown } from "lucide-react";
import { Suspense, useState } from "react";
import Image from "next/image";
import { RootState } from "@/store/store";

import { OrderSummaryCard } from "@/components/OrderSummaryCard";
 
import { notFound, useSearchParams } from "next/navigation";
import CheckoutForm from "@/components/payment/checkoutForm";
import { useSelector } from "react-redux";
type OrderSummaryCardProps = {
    total: number;
    vat: number;
    country: string;
    basePrice: number;
    discount: number;
    coupon: string;
    currency: string;
    paymentMethod: string;
    productCount: number;
    onPlaceOrder: () => void;
};


export  function ProductConfigurationCheckOut() {
    const [showSummary, setShowSummary] = useState(true);
 const searchParams = useSearchParams();
  const planId = searchParams.get('planId');
  const plans = useSelector((state: RootState) => state.plan.plans);

  // If no planId is provided
  if (!planId) {
    return notFound(); // This shows the 404 page
  }

  // Convert planId to number for comparison
  const numericPlanId = parseInt(planId, 10);

  // Find the matching plan
  const plan = plans.find((p) => p.id === numericPlanId);

  // If no matching plan is found
  if (!plan) {
    return notFound(); // Also show 404 if plan not found
  }
    // Simulating dynamic DB data
    const vpnData = [
        {
            productName: 'VPN Premium Plan',
            details: [
                { label: 'Commercial License', included: true },
                { label: '160 locations', included: true },
                { label: '3 simultaneous connections', included: true },
                { label: '12 Month Premium Support', included: false },
            ],
            duration: '12 months',
            config: [
                { label: 'Kill Switch enable', enabled: true },
                { label: 'Extra connections', enabled: true },
            ],
        },
        {
            productName: 'VPN Premium Plan',
            details: [
                { label: 'Get all-in-one Windows protection with Antivirus and Security Updater.', included: true },

            ],
            // duration: '12 months',
            config: [

            ],
        },
    ];

    const tableData = vpnData.map((item, index) => [
        <span key={`product-${index}`} className="text-blue-600 hover:underline">
            {item.productName}
        </span>,
        <div key={`details-${index}`} className="space-y-1">
            {item.details.map((d, i) => (
                <div
                    key={i}
                    className={`flex items-center gap-2 ${d.included ? 'text-green-600' : 'text-red-500 line-through'
                        }`}
                >
                    <Image
                        src={d.included ? '/products/tickIcon.png' : '/products/crossIcon.png'}
                        width={d.included ? 17 : 15}
                        height={d.included ? 17 : 15}
                        alt={d.included ? 'tickIcon' : 'crossIcon'}
                    />
                    <span className="text-gray-700">{d.label}</span>
                </div>
            ))}
        </div>,
        <div key={`config-${index}`} className="space-y-2">
            {item.duration ? (
                <select className="border rounded px-2 py-1">
                    <option>{item.duration}</option>
                </select>
            ) : (""
                //   <div className="text-sm text-gray-400 italic"> </div>
            )}
            {item.config.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={c.enabled}
                        readOnly
                        className="accent-blue-600"
                    />
                    <label>{c.label}</label>
                </div>
            ))}
        </div>,
    ]);


    return (
        <div className="p-4 lg:px-20  bg-slate-50 min-h-screen lg:text-sm text-gray-700 space-y-8">
            <div>
                <h1 className="text-slate-700 text-lg font-semibold">Product Configuration</h1>
            </div>
            <div className="bg-white p-4">
                <VpnPlanTable
                    title="VPN Plans Overview"
                    columns={['Product', 'Details', 'Configuration']}
                    data={tableData}
                    showRemoveBtn={true}
                    onRemove={(index) => console.log("Remove row", index)}
                />




            </div>
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Left Box */}
                <div className="w-full lg:w-1/2 bg-white p-4 shadow rounded">
                    <h2 className="text-lg font-semibold mb-2">Payment section</h2>
                    <CheckoutForm
                        planId={plan.id}
                        amount={+(plan.original_price ?? 0) * 100}
                        // billingAddress={billingAddress}
                        className="w-full lg:w-2/3"
                    />
                </div>

                {/* Right Box */}
                <div className="w-full lg:w-1/2 bg-white p-4 shadow rounded">
                    {/* <OrderSummaryCard></OrderSummaryCard> */}

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
