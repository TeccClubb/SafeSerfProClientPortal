'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FormInput } from '@/components/ui/FormInput';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { HOME_PAGE_PATH } from '@/lib/pathname';
 

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

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });
console.log(res)
    setLoading(false);

    if (res?.ok) {
      // toast.success(res.)
      router.push(HOME_PAGE_PATH);
      toast.success('Login successful!');
    } else {
      setError(res?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm p-8 bg-white border-2 border-blue-900 rounded-lg shadow-md"
      >
        <div className="flex justify-center mb-6">
          <img
            src="/login-logo.png"
            alt="Logo"
            className="h-12 w-12 rotate-6"
          />
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
