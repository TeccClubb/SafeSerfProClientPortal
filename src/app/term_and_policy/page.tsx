"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { GET_OPTIONS_TOS_ROUTE, GET_OPTIONS_PRIVACY_ROUTE } from "@/lib/utils/apiRoutes";

export default function TermsAndPoliciesPage() {
  const [tos, setTos] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tosRes, privacyRes] = await Promise.all([
          axios.get(GET_OPTIONS_TOS_ROUTE, { headers: { Accept: "application/json" } }),
          axios.get(GET_OPTIONS_PRIVACY_ROUTE, { headers: { Accept: "application/json" } }),
        ]);

        if (tosRes.data?.tos) setTos(tosRes.data.tos);
        if (privacyRes.data?.privacy_policy) setPrivacy(privacyRes.data.privacy_policy);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-10">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold">Terms &amp; Policies</h1>
          <p className="text-gray-600 mt-2">Last updated: September 15, 2025</p>
          <p className="text-gray-500 text-sm mt-1">
            Please read these Terms and Privacy Policies carefully before using SafeSurf services.
          </p>
        </header>

        {/* Loading/Error */}
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Terms Section */}
        {!loading && !error && (
          <>
            <section className="space-y-6 text-gray-700 leading-relaxed mb-12">
              <h2 className="text-2xl font-semibold">📜 Terms &amp; Conditions</h2>
              {tos ? (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: tos }}
                />
              ) : (
                <p className="text-gray-500">No Terms & Conditions available.</p>
              )}
            </section>

            {/* Privacy Policy Section */}
            <section className="space-y-6 text-gray-700 leading-relaxed mb-12">
              <h2 className="text-2xl font-semibold">🔒 Privacy Policy</h2>
              {privacy ? (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: privacy }}
                />
              ) : (
                <p className="text-gray-500">No Privacy Policy available.</p>
              )}
            </section>
          </>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500 border-t pt-6">
          <p>
            By using SafeSurf, you agree to these{" "}
            <span className="font-medium">Terms &amp; Policies</span>.
          </p>
          <p className="mt-2">
            <Link href="/" className="underline hover:text-gray-700 transition">
              Back to Home
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
