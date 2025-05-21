// hooks/useLogin.ts
import { useState } from 'react';
import axios from 'axios';

type LoginData = {
  email: string;
  password: string;
};

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`https://seelvpn.tecclubb.com/api/login`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      return response.data; // Pass this to NextAuth via signIn
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };
///////////////
  return { login, loading, error };
}
