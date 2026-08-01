import { useState, useEffect, useCallback } from "react";
import { getDashboardStats } from "../services/dashboardService";

const useDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getDashboardStats();

      if (response.success) {
        setDashboard(response.data);
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    loading,
    refreshDashboard: fetchDashboard,
  };
};

export default useDashboard;