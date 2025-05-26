// hooks/useTicketClose.ts
import { useState } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { API_BASE_URL } from '../utils/apiRoutes';
import { useRouter } from 'next/navigation';

const useTicketClose = () => {
  const [ticketClose, setticketClose] = useState<any>(null);
  const [Ticketloading, setTicketloading] = useState(false);
  const [ticketError, setticketError] = useState<string | null>(null);
  const { data: session } = useSession();
const router=useRouter();
  const closeTicket = async (ticketId: number) => {
    const token = (session?.user as any)?.access_token;
    if (!token) return;

    setTicketloading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/ticket/${ticketId}/close`,
        {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Ticket closed successfully:", response.data);
      setticketClose(response.data.ticket);
      router.push('/'); // Redirect to tickets page on success
     
    } catch (err: any) {
      console.error("Error closing ticket:", err);
      setticketError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setTicketloading(false);
    }
  };

  return { closeTicket, ticketClose, Ticketloading, ticketError };
};

export default useTicketClose;
