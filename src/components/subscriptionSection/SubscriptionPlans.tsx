"use client";

import { ChevronDown } from "lucide-react";
import Summary from "../product/Summary";
import ContinueButton from "./ContinueButton";
import { useState } from "react";
import useActivePlan from "@/lib/hooks/useActiveplane";
import { usePlans } from "@/lib/hooks/usePlans";
import { Plan } from "@/lib/hooks/usePlans";

const SubscriptionPlans = () => {
  const { activePlan, loading: planLoading, error: planError } = useActivePlan();
  const { plans, loading: plansLoading, error: plansError } = usePlans();
  const [showSummary, setShowSummary] = useState(true);

  // Track selected plan
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  if (plansLoading || planLoading) return <p>Loading...</p>;
  if (plansError || planError) return <p>Error loading plans.</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Modify subscription</h2>
      <div className="rounded-lg p-6 lg:px-40 bg-white mt-6">
        <div className="grid  md:grid-cols-2 gap-6">
          {plans
            .filter((plan) => activePlan?.plan?.id !== plan.id)
            .map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)} // 🔥 Update selected plan
                className={`border rounded-lg p-4 cursor-pointer ${
                  selectedPlan?.id === plan.id ? "border-blue-500 shadow-md" : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="py-6">
                    <h3 className="font-semibold text-sm">{plan.name}</h3>
                    <p className="text-2xl font-bold mt-2">
                      ${plan.discount_price ?? plan.original_price ?? "N/A"}
                      <span className="text-sm font-normal">/month</span>
                    </p>
                    <ul className="mt-4 text-sm text-gray-600 space-y-1">
                      {plan.features?.map((feature, index) => (
                        <li key={index}>
                          <span className="text-green-600 mr-1">✔</span>
                          {feature.title}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs mt-4">{plan.description}</p>
                  </div>
                  <input
                    type="radio"
                    name="plan"
                    checked={selectedPlan?.id === plan.id}
                    onChange={() => setSelectedPlan(plan)}
                    className="mt-1 h-5 w-5"
                  />
                </div>
              </div>
            ))}
        </div>

        {/* Checkout Summary */}
        <div className="mt-6 p-4 rounded-md bg-white shadow-sm">
          <div className="mt-6 border border-gray-100 p-4 rounded-md bg-white shadow-sm">
            <div
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={() => setShowSummary((prev) => !prev)}
            >
              <h3 className="text-2xl text-slate-700 font-semibold">Checkout Summary</h3>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  showSummary ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Only show Summary if a plan is selected and summary is expanded */}
            {showSummary && selectedPlan && <Summary plan={selectedPlan} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
