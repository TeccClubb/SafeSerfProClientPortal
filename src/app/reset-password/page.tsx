"use client";

import { useForm } from "react-hook-form";
import { FormInput } from "@/components/ui/FormInput";
// import { useSignup } from '@/hooks/useSignup';
import { useSignup } from "@/lib/hooks/useSignup";
import Link from "next/link";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { FC, Suspense, useState } from "react";
import axios, { AxiosError } from "axios";
import { RESET_PASSWORD_ROUTE } from "@/lib/utils/apiRoutes";
import { toast } from "react-toastify";

type FormValues = { password: string; confirm_password: string };

const ResetPasswordForm: FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  if (!email || !token) {
    notFound();
  }

  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    clearErrors,
    reset,
    setFocus,
  } = useForm<FormValues>({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const submit = async (data: FormValues) => {
    try {
      clearErrors();
      setLoading(true);
      const res = await axios
        .post<{ status: boolean; message: string }>(
          RESET_PASSWORD_ROUTE,
          {
            token,
            email,
            password: data.password,
            password_confirmation: data.confirm_password,
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((res) => res.data);

      console.log(res);

      if (res.status) {
        toast.success(res.message);
        reset();
        router.push("/login");
      } else {
        toast.error(res.message);
        setError("root", { type: "manual", message: res.message });
        reset();
        setFocus("password");
      }
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response
            ? error.response.data.message
            : error.message
          : "Failed to change password";
      setError("root", { type: "manual", message: errorMessage });
      reset();
      setFocus("password");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-sm p-8 bg-white border-2 border-gray-200 rounded-lg shadow-md"
      >
        <div className="flex flex-col items-center justify-center mb-6">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-12 w-12 rotate-6"
          />
          <h1 className="text-black text-xl font-bold mb-4">
            Reset Your Password?
          </h1>
        </div>

        <div className="mb-4">
          <FormInput
            type="password"
            placeholder="Create Password"
            registration={register("password", {
              required: "Type new password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={errors.password}
            className="border text-slate-500 px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <FormInput
            type="password"
            placeholder="Confirm Password"
            registration={register("confirm_password", {
              required: "Please confirm the password",
              validate: (value) => {
                const password = getValues("password");
                if (value !== password) return "Password do not match";
                return true;
              },
            })}
            error={errors.confirm_password}
            className="border text-slate-500 px-4 py-2"
          />
        </div>

        {errors.root && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {errors.root.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-md font-semibold text-white ${
            isLoading
              ? "bg-rose-300 cursor-not-allowed"
              : "bg-rose-500 hover:bg-rose-600"
          }`}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-rose-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

const Page: FC = () => (
  <Suspense>
    <ResetPasswordForm />
  </Suspense>
);

export default Page;
