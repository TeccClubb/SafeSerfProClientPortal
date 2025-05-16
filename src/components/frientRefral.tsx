"use client"
// components/ReferFriend.tsx
import React, { useState } from 'react';
export default function ReferFriend() {
  const [email, setEmail] = useState('');
  const [referralUrl] = useState('Unique URL is generated');

  const handleRefer = () => {
    alert(`Referral sent to: ${email}`);
    setEmail('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    alert('URL copied!');
  };

  return (
    <div className="bg-white border border-slate-300 rounded-md p-6 w-full  mx-auto ">
      <h2 className="text-lg font-semibold mb-4">Refer a friend</h2>

      <div className="flex items-center gap-4 mb-3">
        <input
          type="email"
          placeholder="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" border-slate-300 border px-3 py-1.5 rounded max-w-xs text-sm"
        />
        <button
          onClick={handleRefer}
          className="bg-blue-600 ms-5   px-4 py-1.5 text-white text-sm font-medium rounded hover:bg-blue-700"
        >
          + Refer a friend
        </button>
      </div>

      <p className="  mb-4 text-neutral-400 text-sm font-normal">
        Send the invite URL directly to your friend. Both of you will be able to earn additional extra benefits for using the VPN.
      </p>

      <div className="flex items-center gap-2 mb-3">
        <input
          type="text"
          value={referralUrl}
          readOnly
          className="border-slate-300 border px-3 py-1.5 rounded w-full max-w-xs text-sm text-gray-400"
        />
        <button
          onClick={handleCopy}
          className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700"
        >
          + Copy
        </button>
      </div>

      <p className="  text-neutral-400 text-sm font-normal">
        Copy the invite URL and pass it to your friends by any means. All users registered with the URL will be able to earn additional extra benefits for using the VPN. Additional extra benefits will be applied to your account as well.
      </p>
    </div>
  );
}
