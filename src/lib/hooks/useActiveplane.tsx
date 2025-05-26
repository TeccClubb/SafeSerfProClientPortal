import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type PlanType = {
  id: number;
  name: string;
  slug: string;
  description: string;
  original_price: string;
  discount_price: string;
  duration: number;
  duration_unit: string;
};

type ActivePlanType = {
  id: number;
  amount_paid: string;
  start_date: string;
  end_date: string;
  plan: PlanType;
  status: string;
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
          setLoading(false);
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

        const result: { status: boolean; purchase: ActivePlanType } = await response.json();

        if (result.status && result.purchase) {
          setActivePlan(result.purchase);
        } else {
          setError("No active subscription found");
        }
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
