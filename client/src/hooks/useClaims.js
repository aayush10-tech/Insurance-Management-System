import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getClaims } from "../services/claimService";

const useClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [search, setSearch] = useState("");

  const [totalClaims, setTotalClaims] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchClaims = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getClaims(page, limit, search);

      setClaims(data.claims || []);
      setTotalClaims(data.totalClaims || 0);

      setTotalPages(
        Math.max(1, Math.ceil((data.totalClaims || 0) / limit))
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch claims"
      );
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  return {
    claims,
    loading,

    page,
    setPage,

    limit,

    search,
    setSearch,

    totalClaims,
    totalPages,

    refreshClaims: fetchClaims,
  };
};

export default useClaims;