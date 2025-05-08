const SubscriptionPlans = () => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Modify subscription</h2>
            <div className="rounded-lg p-6 bg-white mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Basic Plan */}
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                            <div className="py-8">
                                <h3 className="font-semibold text-sm">Basic Plan</h3>
                                <p className="text-2xl font-bold mt-2">
                                    $4.99<span className="text-sm font-normal">/month</span>
                                </p>
                                <ul className="mt-4 text-sm text-gray-600 space-y-1">
                                    <li><span className="text-green-600 mr-1">✔</span>Commercial License</li>
                                    <li><span className="text-green-600 mr-1">✔</span>120 locations</li>
                                    <li><span className="text-green-600 mr-1">✔</span>1 simultaneous connection</li>
                                    <li className="text-gray-500"><span className="text-gray-500 mr-1">✘</span>6 Month Premium Support</li>
                                </ul>
                                <p className="text-xs mt-4">Essential protection and access to servers in 10 countries.</p>
                            </div>
                            <input type="radio" name="plan" className="mt-1 h-5 w-5" />
                        </div>
                    </div>

                    {/* Premium Plan */}
                    <div className="border border-blue-600 rounded-lg p-4 relative">
                        <div className="px-4 py-2.5 rounded-full border border-blue-600 text-blue-600 text-xs font-bold inline-block mb-2">
                            Most Popular
                        </div>
                        <div className="flex justify-between items-start">
                            <div className="py-6">
                                <h3 className="font-semibold text-sm">Premium Plan</h3>
                                <p className="text-2xl font-bold mt-2">
                                    $19.99<span className="text-sm font-normal">/month</span>
                                </p>
                                <ul className="mt-4 text-sm text-gray-600 space-y-1">
                                    <li><span className="text-green-600 mr-1">✔</span>Commercial License</li>
                                    <li><span className="text-green-600 mr-1">✔</span>160 locations</li>
                                    <li><span className="text-green-600 mr-1">✔</span>3 simultaneous connections</li>
                                    <li className="text-gray-500"><span className="text-gray-500 mr-1">✘</span>12 Month Premium Support</li>
                                </ul>
                                <p className="text-xs mt-4">Enhanced security with servers in over 50 countries and additional features.</p>
                            </div>
                            <input type="radio" name="plan" className="-mt-8 h-5 w-5" defaultChecked />
                        </div>
                    </div>
                </div>

                {/* ✔ New Checkout Summary */}
                <div className="w-full max-w-5xl bg-white rounded-md mt-10 flex flex-col gap-3 text-sm ">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <p className="text-gray-900 font-medium">Check out Summary</p>
                        <div className="w-4 h-4 flex items-center justify-center">
                            <img src="/chevron-down.svg" alt="Close" className="w-4 h-4 cursor-pointer" />
                        </div>

                    </div>

                    {/* Line Items */}
                    {[
                        ["Subtotal", "€ 5,51"],
                        ["Period", "12 months"],
                        ["Tax", "€ 3,03"],
                        ["Discount", "€ 14,47"],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between items-center px-1.5">
                            <span className="text-gray-900">{label}</span>
                            <span className="text-gray-500">{value}</span>
                        </div>
                    ))}

                    {/* Divider */}
                    <div className="border-t border-neutral-200 my-2" />

                    {/* Total */}
                    <div className="flex justify-between items-center px-1.5">
                        <span className="text-gray-900 text-lg font-medium">Total</span>
                        <span className="text-black text-lg font-medium">€ 79,00</span>
                    </div>

                    {/* Note */}
                    <p className="text-neutral-400 text-sm  mt-2">
                        Subscription modification are executed immediately after the order confirmation. In case of upgrade the difference is recalculated and is shown in Total. For downgrade cases, please submit a support ticket. The order will be processed manually.
                    </p>

                    {/* Continue Button */}
                    <div className="flex justify-end mt-4">

                        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md flex justify-end items-center gap-1">
                            <span className="text-white text-base">+</span>
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPlans;
