import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { API_BASE_URL } from '../utils/apiRoutes';

const useTicketDetails = (ticketId: number) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession(); // add `status` to check if session is loading
  

  useEffect(() => {
    const fetchTicketDetails = async () => {
      const token = (session?.user as any)?.access_token;
      if (!token) return;

      try {
        const response = await axios.get(`${API_BASE_URL}/ticket/${ticketId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          maxBodyLength: Infinity,
        });

        console.log("Fetched ticket details:", response.data);
        setData(response.data.ticket);
      } catch (err: any) {
        console.error("Error fetching ticket:", err);
        setError(err.response?.data?.message || err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (ticketId && status === "authenticated") {
      fetchTicketDetails();
    }

  }, [ticketId, session, status]);

  return { data, loading, error };
};

export default useTicketDetails;
