
"use client"

import { ChevronDown } from "lucide-react";

import { useState } from "react";
import Summary from "../product/Summary";
import ContinueButton from "../subscriptionSection/ContinueButton";


const Order = () => {
    const [showSummary, setShowSummary] = useState(true);
    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-600 mb-4">Modify subscription</h2>
            <div className="rounded-lg p-6 bg-white mt-6">
                <div className="grid md:grid-cols-3 gap-6 ">
                    {/* Basic Plan */}
                    <div className="border border-gray-200 rounded-lg  p-4">
                        <div className="flex justify-between items-start ">
                          <div className="pt-17 pb-4">

                                <h3 className="self-stretch opacity-70  text-slate-800 text-sm font-bold">Basic Plan</h3>
                                <p className="text-2xl text-slate-900 font-bold mt-2">
                                    $4.99<span className="text-sm text-slate-900 font-normall">/month</span>
                                </p>
                                <ul className="mt-4 text-sm text-gray-600 space-y-1">
                                    <li><span className="text-green-600 mr-1">✔</span>Commercial License</li>
                                    <li><span className="text-green-600 mr-1">✔</span>120 locations</li>
                                    <li><span className="text-green-600 mr-1">✔</span>1 simultaneous connection</li>
                                    <li className="text-gray-500"><span className="text-gray-500 mr-1">✘</span>6 Month Premium Support</li>
                                </ul>
                                <p className="text-xs mt-4">Essential protection and access to servers in 10 countries.</p>
                            </div>
                            <input type="radio" name="plan" className="-mt-3 h-5 w-5" />
                        </div>
                    </div>

                    {/* Premium Plan */}
                    <div className="border border-blue-600 rounded-lg p-4 relative">
                        <div className="px-4 py-2.5 rounded-full border border-blue-600 text-blue-600 text-xs font-bold inline-block mb-2">
                            Most Popular
                        </div>
                        <div className="flex justify-between items-start">
                            <div className="pt-4 pb-2">

                                <h3 className="self-stretch opacity-70  text-slate-800 text-sm font-bold">Premium Plan</h3>
                                <p className="text-2xl font-bold text-slate-900 mt-2">
                                    $19.99<span className="text-sm text-slate-900 font-normal">/month</span>
                                </p>
                                <ul className="mt-4 text-sm text-gray-600 space-y-1">
                                    <li><span className="text-green-600 mr-1">✔</span>Commercial License</li>
                                    <li><span className="text-green-600 mr-1">✔</span>160 locations</li>
                                    <li><span className="text-green-600 mr-1">✔</span>3 simultaneous connections</li>
                                    <li className="text-gray-500"><span className="text-gray-500 mr-1">✘</span>12 Month Premium Support</li>
                                </ul>
                                <p className="text-xs mt-4">Enhanced security with servers in over 50 countries and additional features.</p>
                            </div>
                            <input type="radio" name="plan" className="-mt-14 h-6 w-6" defaultChecked />
                        </div>
                    </div>

                    {/* VPN Premium Plan */}
                    <div className="border border-blue-600 rounded-lg p-4 relative">
                        <div className="px-4 py-2.5 rounded-full border border-blue-600 text-blue-600 text-xs font-bold inline-block mb-2">
                            Most Popular
                        </div>
                        <div className="flex justify-between items-start">
                            <div className="pt-4 pb-2">

                                <h3 className="self-stretch opacity-70  text-slate-800 text-sm font-bold">VPN Premium Plan</h3>
                                <p className="text-2xl font-bold mt-2 text-slate-900">
                                    $29.99<span className="text-sm text-slate-900 font-normal">/month</span>
                                </p>
                                <ul className="mt-4 text-sm text-gray-600 space-y-1">
                                    <li><span className="text-green-600 mr-1">✔</span>Commercial License</li>
                                    <li><span className="text-green-600 mr-1">✔</span>160 locations</li>
                                    <li><span className="text-green-600 mr-1">✔</span>3 simultaneous connections</li>
                                    <li className="text-gray-500"><span className="text-gray-500 mr-1">✘</span>12 Month Premium Support</li>
                                </ul>
                                <p className="text-xs mt-4">Enhanced security with servers in over 50 countries and additional features.</p>
                            </div>
                            <input type="radio" name="plan" className="-mt-14 h-6 w-6" />
                        </div>
                    </div>
                </div>

                {/* Checkout Summary */}
                <div className="mt-6 p-4 ">
                    <div className="mt-6  p-4 ">
                        <div
                            className="flex items-center justify-between cursor-pointer mb-2"
                            onClick={() => setShowSummary((prev) => !prev)}
                        >
                            <h3 className="text-2xl text-slate-700 font-semibold">Checkout Summary</h3>
                            <ChevronDown
                                className={`transition-transform duration-300 ${showSummary ? 'rotate-180' : ''}`}
                            />
                        </div>

                        {showSummary && (
                            <>
                                <Summary/>
                               <ContinueButton/>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
