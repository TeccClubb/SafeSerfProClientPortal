// components/OrderSummaryCard.tsx
import { FC } from "react";
// import { AddonCard } from "./AddonCard";
import { AddonCard } from "./addonCard";
import Image from "next/image";

interface OrderSummaryCardProps {
  total: string;
  vat: string;
  country: string;
  basePrice: string;
  originalPrice: string;
  discountText: string;
  monthsExtra: string;
  image:string;
  couponCode: string;
  addons: { name: string; added: boolean,image:string }[];
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
}

export const OrderSummaryCard: FC<OrderSummaryCardProps> = ({
  total,
  vat,
  country,
  basePrice,
  originalPrice,
  discountText,
  monthsExtra,
  couponCode,
  addons,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  return (
    <div className=" w-full p-6     rounded-xl   bg-white space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold"> Order summary</h2>
        <p className="flex items-center gap-1">
          <Image
            width={20}
            height={3}
            alt="address"

            src={"/products/addressicon.png"}></Image>
          <span className="font-medium">Safesurf.Pro One Month subscription</span>
        </p>
        <div className="flex justify-between items-center">
          <p>
            24-months (EUR 2.69/mo) <span className="text-red-500 font-medium">+ {monthsExtra} EXTRA</span>
          </p>
          <p className="text-right font-semibold"># {basePrice}</p>
        </div>
        <div className="text-sm text-gray-500 line-through">$ {originalPrice}</div>
        <span className="bg-green-700 text-white text-xs font-semibold mr-2 px-2.5 py-1 rounded">
          Save {discountText}
        </span>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add Coupon Code"
          className="flex-grow px-3 py-2 border rounded"
        />
        <button className="bg-slate-800/5   text-gray-600 text-sm font-bold  px-4 py-2 rounded" onClick={() => onApplyCoupon(couponCode)}>
          + Add
        </button>
      </div>

      <div className="text-gray-600 text-sm font-normal">
        VAT/Sales Tax 19% <span className="underline cursor-pointer text-gray-600 text-sm font-normal">{country}</span>
        <div className="text-right text-xs font-bold">EUR {vat}</div>
      </div>

      <div className="text-lg font-bold flex justify-between">
        <span className="text-gray-600 text-lg font-bold">Total</span>
        <span>EUR {total}</span>
      </div>

      <div className="flex justify-between items-start text-gray-600 text-sm font-normal">
        <div>
          Coupon code applied:
          <p className="text-green-600 text-sm">
            You’ve received: <span className="font-medium">{monthsExtra}</span>
          </p>
        </div>
        <button
          className="ml-4 flex items-center gap-1 bg-green-700 rounded-[32px] px-3 py-1 text-white"
          onClick={onRemoveCoupon}
        >
          Safesurf ✕
        </button>
      </div>



      {/* <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        {addons.map((addon, idx) => (
         <AddonCard key={idx} name={addon.name} added={addon.added} image={addon.image} />
        ))}
      </div> */}
    </div>
  );
};
