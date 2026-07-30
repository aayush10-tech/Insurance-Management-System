import { useEffect, useState } from "react";
import { getCustomers } from "../services/customerService";

const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(0);

  const fetchCustomers = async (
    currentPage = page,
    currentSearch = search
  ) => {
    try {
      setLoading(true);

      const data = await getCustomers(
  currentPage,
  10,
  currentSearch
);

setCustomers(data.customers || []);
setPage(data.page || 1);
setTotalPages(data.totalPages || 1);
setTotalCustomers(data.totalCustomers || 0);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomers(page, search);
    }, 400);

    return () => clearTimeout(timer);
  }, [page, search]);

  return {
    customers,
    loading,

    page,
    setPage,

    search,
    setSearch,

    totalPages,
    totalCustomers,

    refreshCustomers: () => fetchCustomers(page, search),
  };
};

export default useCustomers;