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
        const payload = {
    email: data.email,
    password: data.password,
  };
     
        const response = await axios.post(`'https://seelvpn.tecclubb.com/api/login`, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(response)
    localStorage.setItem("access_token", response.data.access_token);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
