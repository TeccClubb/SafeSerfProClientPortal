'use client';

import { useForm } from 'react-hook-form';
import { FormInput } from '@/components/ui/FormInput';
// import { useSignup } from '@/hooks/useSignup';
import { useSignup } from '@/lib/hooks/useSignup';

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
      const response = await signup(data);
      console.log('Signup success:', response);
      // Redirect or show success message
    } catch (err) {
      console.error('Signup failed');
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
            src="/signup-logo.png"
            alt="Logo"
            className="h-12 w-12 rotate-6"
          />
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
            loading ? 'bg-rose-300 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600'
          }`}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
