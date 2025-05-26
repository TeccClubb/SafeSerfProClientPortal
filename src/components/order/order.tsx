"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePlans } from "@/lib/hooks/usePlans";
import Summary from "../product/Summary";
import ContinueButton from "../subscriptionSection/ContinueButton";
import PlanCard from "../plans/PlanCard";
import { setSelectedPlan } from "@/store/planSlice";
import { useDispatch } from "react-redux";

const Order = () => {
    const [showSummary, setShowSummary] = useState(true);
    const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(0);
    const { plans, loading, error } = usePlans();

    const selectedPlan = selectedPlanIndex !== null ? plans[selectedPlanIndex] : null;

const dispatch = useDispatch();

      useEffect(() => {
        if (selectedPlan) {
            dispatch(setSelectedPlan(selectedPlan));
        }
    }, [selectedPlan, dispatch]);

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-600 mb-4">Modify subscription</h2>
            <div className="rounded-lg p-6 bg-white mt-6">
                {loading && <p>Loading plans...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}

                {!loading && !error && (
                    <div className="grid md:grid-cols-3 lg:mx-10 gap-10">
                        {plans.map((plan, index) => (
                            <PlanCard
                                key={plan.id || index}
                                plan={plan}
                                isMostPopular={index === 1 || index === 2} // set to true for second and third cards
                                selected={selectedPlanIndex === index}
                                onSelect={() => setSelectedPlanIndex(index)}
                            />
                        ))}
                    </div>
                )}

                {/* Checkout Summary */}
                <div className="mt-6 p-4">
                    <div className="mt-6 p-4">
                        <div
                            className="flex items-center justify-between cursor-pointer mb-2"
                            onClick={() => setShowSummary((prev) => !prev)}
                        >
                            <h3 className="text-2xl text-slate-900 font-semibold">Checkout Summary</h3>
                            <ChevronDown
                                className={`transition-transform text-black duration-300 ${showSummary ? "rotate-180" : ""}`}
                            />
                        </div>

                        {showSummary && selectedPlan && (
                            <>
                                <Summary plan={selectedPlan} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
