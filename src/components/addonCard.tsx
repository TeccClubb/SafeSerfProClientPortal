// components/AddonCard.tsx
import { FC } from "react";
import Image from "next/image";

interface AddonCardProps {
  name: string;
  added: boolean;
  image:string;
}

export const AddonCard: FC<AddonCardProps> = ({ name, added,image }) => {
  return (
    <div className={`border ${added ? "border-slate-50" : "border-green-400"} rounded-lg p-3 text-center shadow-sm flex flex-col items-center gap-4`}>
       <Image src={image} alt={name} width={40} height={40} />
      <div className="text-black text-sm font-semibold">{name}</div>
      <button
        className={` text-sm px-2 py-1 mt-auto rounded ${
          added
            ? "px-4 py-1.5 bg-white rounded text-black border  border-slate-100"
            : "px-2.5 py-1.5 bg-green-700 rounded text-white"
        }`}
        disabled={added}
      >
        {added ? "✓ Added" : "Get Add-On"}
      </button>
    </div>
  );
};
