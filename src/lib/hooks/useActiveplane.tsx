import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type ActivePlanType = {
  plan?: {
    name: string;
    billing_cycle: string;
    connections: number;
  };
  amount_paid: number;
  end_date: string;
  start_date: string;
};

const useActivePlan = () => {
  const { data: session } = useSession();
  const [activePlan, setActivePlan] = useState<ActivePlanType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivePlan = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = (session?.user as any)?.access_token;
        if (!token) {
          setError("Token not available");
          return;
        }

        const response = await fetch("https://safesurf.tecclubb.com/api/purchase/active", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        setActivePlan(result);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchActivePlan();
    }
  }, [session]);

  return { activePlan, loading, error };
};

export default useActivePlan;
