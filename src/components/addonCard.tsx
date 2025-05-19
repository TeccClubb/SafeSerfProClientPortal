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
    <div className="border border-slate-50 rounded-lg p-3 text-center shadow-sm">
       <Image src={image} alt={name} width={40} height={40} className="mx-auto" />
      <div className="text-black text-sm font-semibold mt-4">{name}</div>
      <button
        className={`mt-2 text-sm px-2 py-1 mt-4 rounded ${
          added
            ? "px-4 py-1.5 bg-white rounded text-black border  border-slate-100"
            : "px-2.5 py-1.5 bg-slate-700 rounded text-white"
        }`}
        disabled={added}
      >
        {added ? "✓ Added" : "Get Add-On"}
      </button>
    </div>
  );
};
