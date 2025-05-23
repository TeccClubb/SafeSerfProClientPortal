import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/utils/apiRoutes";
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";



interface PaymentFormProps {
  planId: string;
  amount: number;
  billingAddress?: any;
  className?: string;
}
const options = {
  mode: 'payment',
  amount: 0, // in cents, replace 0 with a valid default or pass as prop
  currency: 'usd',
};

// import { useEffect } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import { useForm } from "react-hook-form";

// type PaymentFormProps = {
//   planId: string;
//   amount: number;
//   billingAddress?: {
//     name?: string;
//     address?: string;
//     city?: string;
//     state?: string;
//     postal_code?: string;
//     country?: string;
//   };
//   className?: string;
// };

type FormData = {
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

// import React, { useEffect, useState } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import { useForm } from "react-hook-form";
// import axios from "axios";

interface PaymentFormProps {
  planId: string;
  amount: number; // in cents
  // billingAddress?: {
  //   name?: string;
  //   address?: string;
  //   city?: string;
  //   state?: string;
  //   postal_code?: string;
  //   country?: string;
  // };
  className?: string;
}

// interface FormData {
//   name: string;
//   address: string;
//   city: string;
//   state: string;
//   postal_code: string;
//   country: string;
// }

const PaymentForm = ({ planId, amount, billingAddress, className }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  // Populate form with billingAddress values if provided
  // useEffect(() => {
  //   if (billingAddress) {
  //     setValue("name", billingAddress.name || "");
  //     setValue("address", billingAddress.address || "");
  //     setValue("city", billingAddress.city || "");
  //     setValue("state", billingAddress.state || "");
  //     setValue("postal_code", billingAddress.postal_code || "");
  //     setValue("country", billingAddress.country || "");
  //   }
  // }, [billingAddress, setValue]);

  const onSubmit = async (values: FormData) => {
    setErrorMessage(undefined);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet.");
      return;
    }

    try {
      // Trigger validation for Stripe Payment Element
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }

      setLoading(true);

      // Call backend to create payment intent
      const res = await axios.post("/api/create-payment-intent", { amount });
      const data = res.data;

      if (!data.clientSecret) {
        setErrorMessage("Client secret is missing from payment intent.");
        setLoading(false);
        return;
      }

      // Confirm payment with Stripe
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecret,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: values.name,
              address: {
                line1: values.address,
                city: values.city,
                state: values.state,
                postal_code: values.postal_code,
                country: values.country,
              },
            },
          },
          return_url: `${window.location.origin}/payment-processing?planId=${planId}`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      }
      // Otherwise, customer will be redirected automatically

    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {/* <input
        {...register("name", { required: "Name is required" })}
        placeholder="Name"
        className="w-full p-2 border rounded mb-2"
      />
      {errors.name && <p className="text-red-600">{errors.name.message}</p>} */}

      {/* <input
        {...register("address", { required: "Address is required" })}
        placeholder="Address"
        className="w-full p-2 border rounded mb-2"
      /> */}
      {/* {errors.address && <p className="text-red-600">{errors.address.message}</p>}

      <input
        {...register("city", { required: "City is required" })}
        placeholder="City"
        className="w-full p-2 border rounded mb-2"
      />
      {errors.city && <p className="text-red-600">{errors.city.message}</p>} */}
{/* 
      <input
        {...register("state", { required: "State is required" })}
        placeholder="State"
        className="w-full p-2 border rounded mb-2"
      />
      {errors.state && <p className="text-red-600">{errors.state.message}</p>} */}

      {/* <input
        {...register("postal_code", { required: "Postal code is required" })}
        placeholder="Postal Code"
        className="w-full p-2 border rounded mb-2"
      />
      {errors.postal_code && (
        <p className="text-red-600">{errors.postal_code.message}</p>
      )} */}

      {/* <input
        {...register("country", { required: "Country is required" })}
        placeholder="Country"
        className="w-full p-2 border rounded mb-4"
      />
      {errors.country && <p className="text-red-600">{errors.country.message}</p>} */}

      <div className="mb-4 border p-4 rounded">
        <PaymentElement />
      </div>

      {errorMessage && (
        <p className="text-red-600 mb-4 text-center">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full bg-[#4DB8AC] text-white py-3 rounded-full disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
};

// export default PaymentForm;


// export default PaymentForm;



interface CheckoutFormProps {
  planId: string | number;
  amount: number;
  className?: string;
  billingAddress?: any;
}

const CheckoutForm = ({ planId, amount, className, billingAddress }: CheckoutFormProps) => {
  if (!STRIPE_PUBLISHABLE_KEY) {
    throw new Error("STRIPE_PUBLISHABLE_KEY is not defined");
  }
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  const options: StripeElementsOptions = {
    mode: "payment",
    amount,
    currency: "usd",
    appearance: {
      variables: {
        colorPrimary: "#101418",
        colorBackground: "#ffffff00",
        borderRadius: "14px",
        colorText: "#101418",
        colorSuccess: "#2e7d32",
        colorDanger: "#d32f2f",
        colorWarning: "#ed6c02",
      },
    },
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm
        planId={String(planId)}
        amount={amount}
        billingAddress={billingAddress}
        className={className}
      />
    </Elements>
  );
};

export default CheckoutForm;