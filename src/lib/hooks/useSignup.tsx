// hooks/useSignup.ts
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SIGNUP_ROUTE } from '../utils/apiRoutes';

type SignupData = {
  name: string;
  email: string;
  password: string;
};

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (data: SignupData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        SIGNUP_ROUTE,
        data,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      // ✅ Show success message from API
      const message = response.data?.message+"!Please verify your email" || 'Signup successful!';
      toast.success(message);

      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Something went wrong';
      setError(message);
      toast.error(message); // ✅ Optional: show toast on error too
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
}
