import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { getPolicies } from "../services/policyService";

const usePolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [search, setSearch] = useState("");

  const [totalPolicies, setTotalPolicies] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPolicies = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getPolicies(page, limit, search);

      setPolicies(data.policies);
      setTotalPolicies(data.totalPolicies);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch policies"
      );
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  return {
    policies,
    loading,

    page,
    setPage,

    limit,

    search,
    setSearch,

    totalPolicies,
    totalPages,

    refreshPolicies: fetchPolicies,
  };
};

export default usePolicies;