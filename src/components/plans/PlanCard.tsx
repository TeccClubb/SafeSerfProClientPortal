"use client";

import React from "react";
import { cn } from "@/lib/utils"; // Utility for conditional classNames
import { Plan } from "@/lib/hooks/usePlans";

interface PlanCardProps {
    plan: Plan;
    selected: boolean;
    onSelect: () => void;
    isMostPopular?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
    plan,
    selected,
    onSelect,
    isMostPopular = false,
}) => {
    const enabledFeatures = plan.features.filter((feature) => feature.enabled === 1);

    return (
        <div
            onClick={onSelect}
            className={cn(
                "border rounded-lg p-4 cursor-pointer transition-all",
                selected ? "border-blue-600" : "border-gray-200",
                "relative hover:shadow-md"
            )}
        >

            <div className="flex justify-between items-start">
                <div className="pt-4 pb-2">
                    {isMostPopular && (
                        <div className=" px-4 py-2.5  mt-5  rounded-[70px]  outline-1 outline-offset-[-1px] outline-blue-600    text-black  text-xs font-bold bg-white z-10">
                            Most Popular
                        </div>
                    )}
                    <h3 className={`text-slate-800 text-lg font-bold opacity-70 ${isMostPopular ? 'mt-6' : 'mt-12'}`}>
                        {plan.name}
                    </h3>
                    <p className="text-2xl font-bold text-slate-900 mt-2">
                        {plan.original_price}
                        <span className="text-sm font-normal">/month</span>
                    </p>
                    <ul className="mt-4 text-sm text-gray-600 space-y-1">
                        {enabledFeatures.map((feature) => (
                            <li key={feature.id}>
                                <span className="text-green-600 mr-1">✔</span>
                                {feature.title}
                            </li>
                        ))}
                    </ul>
                    <p className="text-xs mt-4 text-gray-500">{plan.description}</p>
                </div>
                <input
                    id={String(plan.id)}
                    type="radio"
                    name="plan"
                    checked={selected}
                    onChange={onSelect}
                    className="mt-2 h-5 w-5"
                />
            </div>
        </div>
    );
};

export default PlanCard;
