import { useEffect, useState } from "react";
import {
  getDocuments,
  uploadDocument,
  updateDocument,
  deleteDocument,
} from "../services/documentService";
import { toast } from "react-toastify";

const useDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const data = await getDocuments(page, limit, search);

      setDocuments(data.documents);
      setTotalPages(data.totalPages);
      setTotalDocuments(data.totalDocuments);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch documents."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [page, limit, search]);

  const addDocument = async (formData) => {
    try {
      await uploadDocument(formData);
      toast.success("Document uploaded successfully.");
      fetchDocuments();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to upload document."
      );
    }
  };

  const editDocument = async (id, data) => {
    try {
      await updateDocument(id, data);
      toast.success("Document updated successfully.");
      fetchDocuments();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update document."
      );
    }
  };

  const removeDocument = async (id) => {
    try {
      await deleteDocument(id);
      toast.success("Document deleted successfully.");
      fetchDocuments();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete document."
      );
    }
  };

  return {
    documents,
    loading,

    page,
    setPage,

    limit,
    setLimit,

    search,
    setSearch,

    totalPages,
    totalDocuments,

    fetchDocuments,
    addDocument,
    editDocument,
    removeDocument,
  };
};

export default useDocuments;