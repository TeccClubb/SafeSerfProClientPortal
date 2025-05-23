"use client";

import React, { Suspense, useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
// import { useUserCookie } from "@/hooks/use-cookies";
// import { ADD_PURCHASE_PLAN_ROUTE } from "@/lib/constants";
import axios, { AxiosError } from "axios";
// import { HOME_PAGE_PATH } from "@/lib/pathnames";
// import { ErrorIcon, VerifiedIcon } from "@/icons";
import ErrorIcon from "@/components/icon/ErrorIcon";
import VerifiedIcon from "@/components/icon/VerifiedIcon";

// import { useDispatch } from "react-redux";
// import { setActivePlan } from "@/store/plans.slice";
// import { useNotifications } from "@toolpad/core/useNotifications";
 
import Link from "next/link";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/lib/utils/apiRoutes";
import { getSession, useSession } from "next-auth/react";

const PaymentProcessingPage = () => {
  //   const dispatch = useDispatch();
  //   const notify = useNotifications();
  const searchParams = useSearchParams();
  //   const { user } = useUserCookie();
  const [user, setUser] = useState();
  const [isPaymentSuccessful, setPaymentStatus] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

 const { data: session, status } = useSession();
 
// const token =session?.user?.access_token;

 useEffect(() => {
  if (status === "loading") return; // Wait until session is ready

  const paymentIntent = searchParams.get("payment_intent");
  const planId = searchParams.get("planId");
  const token = session?.user?.access_token;

  if (!paymentIntent || !planId || !token) {
    notFound(); // or handle missing token with an error message
    return;
  }

  const verifyPayment = async (planId: number, paymentIntent: string) => {
    try {
      const res = await axios
        .post("/api/verify-payment", { paymentIntent })
        .then((res) => res.data);

      if (res.paymentStatus) {
        setPaymentStatus(true);

        const response = await axios
          .post(
            `${API_BASE_URL}/purchase/add`,
            {
              plan_id: planId,
              payment_intent: paymentIntent,
            },
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => response.data);

        if (response.status) {
          setSuccessMessage(response.message);
          toast.success(response.message);
        }
      } else {
        setPaymentStatus(false);
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError && error.response
          ? error.response.data.message
          : "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  verifyPayment(+planId, paymentIntent);
}, [status, session]);


  return (
    <section className="bg-white w-full flex flex-col items-center justify-center pt-4">
      <div className="min-h-[calc(100vh-4rem)] w-full max-w-7xl flex flex-col flex-wrap items-center justify-center gap-y-4 p-4">
        {isLoading && (
          <div className="flex flex-col items-center gap-y-6">
            <VerifiedIcon className="size-48 text-green-500" />

            <h4 className="text-2xl font-semibold text-black">
              Processing Payment...
            </h4>

          </div>
        )}

        {!isLoading && !isPaymentSuccessful && (
          <>
            <ErrorIcon className="size-48 text-red-500" />
            <h1 className="text-3xl font-semibold text-gray-900">
              Payment Failed
            </h1>

            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-3xl">
              <strong className="font-bold">Error: </strong>
              <span>
                Unfortunately, we were unable to process your payment. Please try again or contact support if the issue persists.
              </span>
            </div>

          </>
        )}

        {!isLoading && isPaymentSuccessful && (
          <>
            <VerifiedIcon className="size-48 text-green-500" />
            <h1 className="text-3xl font-semibold text-gray-900">
              Payment Successful
            </h1>
           {successMessage && (
  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded max-w-3xl">
    <strong className="font-bold">Success: </strong>
    <span>{successMessage}</span>
  </div>
)}

          <Link
  href="/"
  className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
>
  Back to Home
</Link>
          </>
        )}
      </div>
    </section>
  );
};

const Page = () => (
  <Suspense>
    <PaymentProcessingPage />
  </Suspense>
);

export default Page;
