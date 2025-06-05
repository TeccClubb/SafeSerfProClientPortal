"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormInput } from "@/components/ui/FormInput";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";
import { FORGOT_PASSWORD_ROUTE } from "@/lib/utils/apiRoutes";

type FormValues = {
  email: string;
};

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(
        FORGOT_PASSWORD_ROUTE,
        { email: data.email },
        { headers: { Accept: "application/json" } }
      );

      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message);
        reset();
      } else {
        toast.error(res.data.message);
        setError(res.data.message);
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong.";
      toast.error(message);
      toast.error("Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm p-8 bg-white border-2 border-blue-900 rounded-lg shadow-md"
      >
        <div className="flex flex-col items-center justify-center mb-6">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-12 w-12 rotate-6"
          />
          <h1 className="text-black text-xl font-bold mb-4">
            Forgot Your Password?
          </h1>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            Enter the email address associated with your account and we’ll send
            you a link to reset your password.
          </p>
        </div>

        <div className="mb-4">
          <FormInput
            type="email"
            placeholder="Email"
            registration={register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            })}
            error={errors.email}
            className="border text-slate-500 px-4 py-2"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`mb-3 w-full py-2 rounded-md font-semibold text-white transition-all ${
            loading
              ? "bg-rose-300 cursor-not-allowed"
              : "bg-rose-500 hover:bg-rose-600"
          }`}
        >
          {loading ? "Logging In..." : "Log In"}
        </button>

        <Link
          href="/login"
          className="hover:underline text-rose-500 font-medium"
        >
          Back to Login
        </Link>
      </form>
    </div>
  );
}
