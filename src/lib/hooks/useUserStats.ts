import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { API_BASE_URL } from "../utils/apiRoutes";

// Define the type of the user stats returned by the API
type UserStatsType = {
  purchases: number;
  servers: number;
  tickets: number;
};

// Define the expected structure of the API response
type ApiResponse = {
  status: boolean;
  stats: UserStatsType;
};

const useUserStats = () => {
  const { data: session } = useSession();
  const [userStats, setUserStats] = useState<UserStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = (session?.user as any)?.access_token;
        if (!token) {
          setError("Token not available");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/user/stats`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
console.log(response)
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result: ApiResponse = await response.json();

        if (result.status && result.stats) {
          setUserStats(result.stats);
        } else {
          setError("Failed to retrieve user stats");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchUserStats();
    }
  }, [session]);

  return { userStats, loading, error };
};

// export default useUserStats;
export default useUserStats;
