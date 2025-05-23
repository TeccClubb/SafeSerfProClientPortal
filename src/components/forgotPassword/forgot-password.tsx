"use client";

import { FORGOT_PASSWORD_ROUTE } from "@/lib/utils/apiRoutes";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
 // Make sure this path is correct

const ForgotPasswordPage = () => {
  type ForgotPasswordFormData = {
    email: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: { email: string }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        FORGOT_PASSWORD_ROUTE,
        { email: data.email },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        toast.success(response.data.message);
        reset(); // Clear form
      } else {
        toast.error("Failed to send reset link.");
        toast.error(response.data.message);
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Something went wrong.";
      toast.error(message);
      toast.error("Failed to send reset link.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-800">
      <main className="flex flex-col items-center justify-center flex-grow mb-18">
        <img src="/loginicon.png" alt="Logo" className="w-16 h-16 mb-4" />
        <h1 className="text-xl font-bold mb-4">Forgot Your Password?</h1>
        <p className="text-sm text-gray-500 mb-6 text-center max-w-xs">
          Enter the email address associated with your account and we’ll send
          you a link to reset your password.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm mx-auto"
        >
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-[70%] mx-auto block px-4 py-2 mb-1 border border-gray-300 rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm text-center mb-2">
              {errors.email.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-[50%] mx-auto mt-4 block bg-teal-400 hover:bg-teal-500 text-white py-2 rounded-full"
          >
            {loading ? "Loading..." : "Send Reset Link"}
          </button>

          <div className="text-center mt-4 text-sm">
            Remembered your password?{" "}
            <a href="/login" className="text-teal-600 underline">
              Log in
            </a>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
