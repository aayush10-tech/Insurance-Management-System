import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

const useDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboardStats();

      if (response.success) {
        setDashboard(response.data);
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    dashboard,
    loading,
    refreshDashboard: fetchDashboard,
  };
};

export default useDashboard;