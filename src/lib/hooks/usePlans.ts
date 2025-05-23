import { useEffect, useState } from "react";
import axios from "axios";
import { GET_PLANS_ROUTE } from "../utils/apiRoutes";
import { useDispatch } from "react-redux";
// import { setPlans } from "@/redux/slices/plansSlice";
import { setPlanss } from "@/store/planSlice";

 export interface Feature {
  id: number;
  title: string;
  enabled: number; // 1 = true, 0 = false
}

export interface Plan {
  id: number;
  name: string;
  slug: string;
  description: string;
  original_price: string | null; // price is null in your data
  discount_price:string | null
  duration: number;
  duration_unit: string;
  features: Feature[];
}

export interface PlansResponse {
  plans: Plan[];
}


export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
const dispatch = useDispatch();
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(GET_PLANS_ROUTE, {
          headers: {
            Accept: "application/json",
          },
        });
        setPlans(res.data.plans); // Adjust if needed based on response shape
        dispatch(setPlanss(res.data.plans));
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
