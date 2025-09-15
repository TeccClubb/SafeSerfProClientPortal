"use client";

import React from "react";
import { Shield, Globe, PlayCircle, Gamepad2 } from "lucide-react"; // icons

const dnsTypes = [
  {
    name: "Unblock DNS",
    description:
      "Bypass geo-restrictions and access content worldwide. Ideal for travelers or users who want unrestricted access.",
    features: [
      "Access blocked websites",
      "Unlock region-specific apps",
      "Safe browsing experience",
    ],
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  {
    name: "Secure DNS",
    description:
      "Encrypt DNS queries to protect against snooping, phishing, and DNS hijacking attempts.",
    features: [
      "DNS over HTTPS (DoH)",
      "Phishing & malware protection",
      "Enhanced privacy online",
    ],
    icon: Shield,
    color: "text-green-500",
    bg: "bg-green-100",
  },
  {
    name: "Streaming DNS",
    description:
      "Optimized servers for seamless video and music streaming with minimal buffering.",
    features: [
      "Faster content delivery",
      "Supports Netflix, YouTube, Spotify",
      "Stable high-speed connections",
    ],
    icon: PlayCircle,
    color: "text-purple-500",
    bg: "bg-purple-100",
  },
  {
    name: "Gaming DNS",
    description:
      "Low latency DNS specifically designed for gamers to reduce lag and improve response times.",
    features: [
      "Low ping optimization",
      "Better matchmaking speeds",
      "Secure game server access",
    ],
    icon: Gamepad2,
    color: "text-orange-500",
    bg: "bg-orange-100",
  },
];

export default function SmartDnsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">
          SmartDNS Types
        </h1>
        <p className="text-center text-gray-500  font-semibold max-w-2xl mx-auto mb-12">
          Choose the DNS type that fits your needs — whether it’s for security,
          streaming, gaming, or unrestricted browsing.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {dnsTypes.map((dns, i) => (
            <div
              key={i}
              className="flex flex-col p-6 rounded-2xl shadow-md bg-white border border-gray-100 hover:shadow-lg transition group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl ${dns.bg} group-hover:scale-110 transition`}
                >
                  <dns.icon className={`w-8 h-8 ${dns.color}`} />
                </div>
                <h2 className="text-xl font-semibold">{dns.name}</h2>
              </div>

              <p className="text-gray-600 text-sm mt-3">{dns.description}</p>

              <ul className="list-disc list-inside text-gray-500 text-sm mt-4 space-y-1 pl-1">
                {dns.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
