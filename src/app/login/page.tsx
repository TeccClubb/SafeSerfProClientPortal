'use client';

import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FormInput } from '@/components/ui/FormInput';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { HOME_PAGE_PATH } from '@/lib/pathname';
import { getOrCreateDeviceId } from '@/components/deviceId';
import getDeviceName from '@/components/getDeviceName';
import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '@/lib/utils/apiRoutes';
import { User } from 'next-auth';
 

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError("");
    const deviceId = getOrCreateDeviceId();
    const deviceName = getDeviceName();
    try {
      const res = await axios
        .post<{
          status: boolean;
          message: string;
          user: User;
          access_token: string;
        }>(
          `${API_BASE_URL}/login`,
          {
            body: JSON.stringify({
              email: data.email,
              password: data.password,
              device_id: deviceId,
              device_name: deviceName,
            }),
          },
          {
            headers: { Accept: "application/json" },
          }
        )
        .then((res) => res.data);

      if (res.status) {
        toast.success(res.message);
        await signIn("credentials", {
          callbackUrl: HOME_PAGE_PATH,
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          access_token: res.access_token,
        });
      } else {
        toast.error(res.message);
        setError(res.message);
      }
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error.response
            ? error.response.data.message
            : error.message
          : error instanceof Error
          ? error.message
          : "Failed to login";
      toast.error(message);
      setError(message);
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
            Login
          </h1>
        </div>

        <div className="mb-4">
          <FormInput
            type="email"
            placeholder="Email"
            registration={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Enter a valid email',
              },
            })}
            error={errors.email}
            className="border text-slate-500 px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <FormInput
            type="password"
            placeholder="Password"
            registration={register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={errors.password}
            className="border text-slate-500 px-4 py-2"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input type="checkbox" id="remember" className="mr-2" />
          <label htmlFor="remember" className="text-sm text-gray-700">
            Remember me
          </label>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
  type="submit"
  disabled={loading}
  className={`w-full py-2 rounded-md font-semibold text-white transition-all ${
    loading
      ? "bg-rose-300 cursor-not-allowed"
      : "bg-rose-500 hover:bg-rose-600"
  }`}
>
  {loading ? "Logging In..." : "Log In"}
</button>

<div className="flex justify-between items-center mt-3 text-sm text-gray-600">
  <Link href="/forgot-password" className="hover:underline text-rose-500 font-medium">
    Forgot Password?
  </Link>
  <Link href="/signup" className="hover:underline text-rose-500 font-medium">
    Sign Up
  </Link>
</div>
      </form>
    </div>
  );
}
