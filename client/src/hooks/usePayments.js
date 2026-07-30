import { useEffect, useState } from "react";
import { getPayments } from "../services/paymentService";

const usePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [totalPayments, setTotalPayments] = useState(0);

  const fetchPayments = async (
    currentPage = page,
    currentSearch = search,
    currentStatus = status,
    currentMethod = paymentMethod
  ) => {
    try {
      setLoading(true);

      const data = await getPayments(
        currentPage,
        10,
        currentSearch,
        currentStatus,
        currentMethod
      );

      setPayments(data.payments || []);
      setPage(data.page || 1);
      setTotalPages(data.totalPages || 1);
      setTotalPayments(data.totalPayments || 0);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPayments(page, search, status, paymentMethod);
    }, 400);

    return () => clearTimeout(timer);
  }, [page, search, status, paymentMethod]);

  return {
    payments,
    loading,

    page,
    setPage,

    search,
    setSearch,

    status,
    setStatus,

    paymentMethod,
    setPaymentMethod,

    totalPages,
    totalPayments,

    refreshPayments: () =>
      fetchPayments(page, search, status, paymentMethod),
  };
};

export default usePayments;