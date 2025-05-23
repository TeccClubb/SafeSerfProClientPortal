import { Plan } from "@/lib/hooks/usePlans";
import { FC } from "react";
import ContinueButton from "../subscriptionSection/ContinueButton";




interface SummaryProps {
  plan: Plan;

}
const handleTotalPrice = (plan: Plan) => {
  const originalPrice = parseFloat(plan.original_price ?? '0');
  const discountPrice = parseFloat(plan.discount_price ?? '0');

  const totalPrice = originalPrice - discountPrice;
  return totalPrice.toFixed(2);
};


const Summary: FC<SummaryProps> = ({ plan }) => {
  return (
    <div className="pt-4 mt-4 text-sm text-gray-700 space-y-1">
      <div className="leading-relaxed">
        <p className="text-gray-900 text-md font-normal">
          SubTotal: <span className="float-right">${plan.original_price}</span>
        </p>
        <p className="text-gray-900 text-md font-normal">
          period: <span className="float-right">{plan.duration}/{plan.duration_unit}</span>
        </p>
        <p >
          Discount: <span className="float-right">{plan.discount_price}</span>
        </p>
        {/* Add more plan details as needed */}
      </div>
      <p className="font-bold text-base border-t border-gray-200 py-5">
        Total: <span className="float-right text-lg">${handleTotalPrice(plan)}</span>
      </p>
      <p className="text-neutral-400 text-sm font-normal">
        Subscription modification are executed immediately after the order confirmation. In case of upgrade the difference is recalculated and is shown in Total. For downgrade cases, please submit a support ticket the order will be processed manually.   </p>
      <div>
        <ContinueButton
          label=" + Continue"
          className="text-lg px-4 py-2"
          // redirectUrl="/productCheckOut?planId=" + plan.id
          redirectUrl={`/productCheckOut?planId=${plan.id}`} // Use template literal for dynamic URL
        />
      </div>
    </div>
  );
};

export default Summary;
