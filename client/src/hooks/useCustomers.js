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

      const response = await getCustomers(
        currentPage,
        10,
        currentSearch
      );

      if (response.success) {
        setCustomers(response.data.customers);
        setPage(response.data.page);
        setTotalPages(response.data.totalPages);
        setTotalCustomers(response.data.totalCustomers);
      }
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