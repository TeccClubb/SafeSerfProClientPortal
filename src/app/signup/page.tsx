'use client';

import { useForm } from 'react-hook-form';
import { FormInput } from '@/components/ui/FormInput';
// import { useSignup } from '@/hooks/useSignup';
import { useSignup } from '@/lib/hooks/useSignup';
import Link from "next/link";

type FormValues = {
  
  username: string;
  email: string;
  password: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { signup, loading, error } = useSignup();

  const onSubmit = async (data: FormValues) => {
    try {
      // Map `username` to `name` for API
      const payload = {
        name: data.username,
        email: data.email,
        password: data.password,
      };
      const response = await signup(payload);
      console.log('Signup success:', response);
      // Optionally: Redirect or show a toast
    } catch (err) {
      console.error('Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm p-8 bg-white border-2 border-gray-200 rounded-lg shadow-md"
      >
        <div className="flex flex-col items-center justify-center mb-6">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-12 w-12 rotate-6"
          />
          <h1 className="text-black text-xl font-bold mb-4">
            Sign Up
          </h1>
        </div>

        <div className="mb-4">
          <FormInput
            type="text"
            placeholder="Username"
            registration={register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
            })}
            error={errors.username}
            className="border text-slate-500 px-4 py-2"
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

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
  type="submit"
  disabled={loading}
  className={`w-full py-2 rounded-md font-semibold text-white ${
    loading ? "bg-rose-300 cursor-not-allowed" : "bg-rose-500 hover:bg-rose-600"
  }`}
>
  {loading ? "Signing Up..." : "Sign Up"}
</button>

<p className="mt-4 text-sm text-center text-gray-600">
  Already have an account?{" "}
  <Link href="/login" className="text-rose-500 hover:underline font-medium">
    Login
  </Link>
</p>
      </form>
    </div>
  );
}
