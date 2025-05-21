// hooks/useSignup.ts
import { useState } from 'react';
import axios from 'axios';

type SignupData = {
  username: string;
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
      const response = await axios.post('/api/signup', data);
      return response.data; // Adjust this based on your backend response
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
}
