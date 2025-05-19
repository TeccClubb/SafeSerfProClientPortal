// app/product/page.tsx (or similar)
"use client";

import VpnPlanTable from "@/components/VpnPlanTable";
import ProductList from "@/components/product/ProductList";
import Summary from "@/components/product/Summary";
import AddProductButton from "@/components/product/AddProductButton";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ProductConfiguration() {
    const [showSummary, setShowSummary] = useState(true);

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
    ];

    const tableData = vpnData.map((item) => [
        <span className="text-blue-600 hover:underline">{item.productName}</span>,
        <div className="space-y-1">
            {item.details.map((d, i) => (
                <div
                    key={i}
                    className={`flex items-center gap-2 ${d.included ? 'text-green-600' : 'text-red-500 line-through'}`}
                >
                    {d.included ?
                    
                    <span> <Image src={"/products/tickIcon.png"}
                         width={17}
                         height={17}
                         alt="tickIcon"
                    
                    >
                        </Image></span>
                    :  <span> <Image src={"/products/crossIcon.png"}
                         width={15}
                         height={15}
                         alt="crossIcon"
                    
                    >
                        </Image></span>
                    
                    } <span className="text-gray-700">{d.label}</span>
                </div>
            ))}
        </div>,
        <div className="space-y-2">
            <select className="border rounded px-2 py-1">
                <option>{item.duration}</option>
            </select>
            {item.config.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                    <input type="checkbox" checked={c.enabled} readOnly className="accent-blue-600" />
                    <label>{c.label}</label>
                </div>
            ))}
        </div>,
    ]);

    return (
        <div className="p-3 lg:p-20 bg-slate-50 min-h-screen lg:text-sm text-gray-700 space-y-8">
            <div>
                <h1 className="text-slate-700 text-lg font-semibold">Product Configuration</h1>
            </div>
            <div className="bg-white p-4">
                <VpnPlanTable
                    title="VPN Plans Overview"
                    columns={['Product', 'Details', 'Configuration']}
                    data={tableData}
                //   showRemoveBtn={true}
                //   onRemove={(index) => console.log("Remove row", index)}
                />

                <ProductList />

                <div className="mt-6 border border-slate-200 p-4 rounded-md bg-white shadow-sm">
                    <div className="mt-6 p-4 rounded-md bg-white">
                        <div
                            className="flex items-center justify-between cursor-pointer mb-2"
                            onClick={() => setShowSummary((prev) => !prev)}
                        >
                            <h3 className="text-2xl text-slate-700 font-semibold">Checkout Summary</h3>
                            <ChevronDown className={`transition-transform duration-300 ${showSummary ? 'rotate-180' : ''}`} />
                        </div>

                        {showSummary && (
                            <>
                                <Summary />
                                <AddProductButton />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
