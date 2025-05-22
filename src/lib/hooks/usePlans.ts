import { useEffect, useState } from "react";
import axios from "axios";
import { GET_PLANS_ROUTE } from "../utils/apiRoutes";

export interface Plan {
  id: string;
  name: string;
  price: number;
  description?: string;
  features: string[];
  // Add any other fields your plan has
}

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(GET_PLANS_ROUTE, {
          headers: {
            Accept: "application/json",
          },
        });
        setPlans(res.data.plans); // Adjust if needed based on response shape
      } catch (err: any) {
        setError(err.message || "Failed to fetch plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, loading, error };
};
