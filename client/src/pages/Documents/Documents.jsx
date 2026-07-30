import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

import DocumentTable from "../../components/documents/DocumentTable";
import DocumentSearch from "../../components/documents/DocumentSearch";
import DocumentPagination from "../../components/documents/DocumentPagination";
import DocumentModal from "../../components/documents/DocumentModal";
import ViewDocumentModal from "../../components/documents/ViewDocumentModal";
import DeleteDocumentModal from "../../components/documents/DeleteDocumentModal";

import useDocuments from "../../hooks/useDocuments";
import { downloadDocument } from "../../services/documentService";
import { getCustomers } from "../../services/customerService";

const Documents = () => {
  const {
    documents,
    loading,
    page,
    setPage,
    search,
    setSearch,
    totalPages,
    totalDocuments,
    addDocument,
    editDocument,
    removeDocument,
  } = useDocuments();

  const [customers, setCustomers] = useState([]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers(1, 1000, "");
      setCustomers(data.customers || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    setSelectedDocument(null);
    setIsAddOpen(true);
  };

  const handleEdit = (document) => {
    setSelectedDocument(document);
    setIsEditOpen(true);
  };

  const handleView = (document) => {
    setSelectedDocument(document);
    setIsViewOpen(true);
  };

  const handleDelete = (document) => {
    setSelectedDocument(document);
    setIsDeleteOpen(true);
  };

  const handleAddSubmit = async (formData) => {
    await addDocument(formData);
    setIsAddOpen(false);
  };

  const handleEditSubmit = async (formData) => {
    await editDocument(selectedDocument.id, formData);
    setIsEditOpen(false);
    setSelectedDocument(null);
  };

  const handleDeleteConfirm = async (id) => {
    await removeDocument(id);
    setIsDeleteOpen(false);
    setSelectedDocument(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold">Documents</h1>

            <p className="text-slate-500 mt-2">
              Total Documents: {totalDocuments}
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            + Upload Document
          </button>
        </div>

        <DocumentSearch
          search={search}
          setSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />

        {loading ? (
          <div className="bg-white rounded-xl border py-20 text-center">
            Loading...
          </div>
        ) : (
          <>
            <DocumentTable
              documents={documents}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDownload={downloadDocument}
            />

            <DocumentPagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </>
        )}

        <DocumentModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onSubmit={handleAddSubmit}
          customers={customers}
        />

        <DocumentModal
          isOpen={isEditOpen}
          initialData={selectedDocument}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedDocument(null);
          }}
          onSubmit={handleEditSubmit}
          customers={customers}
        />

        <ViewDocumentModal
          isOpen={isViewOpen}
          document={selectedDocument}
          onClose={() => {
            setIsViewOpen(false);
            setSelectedDocument(null);
          }}
        />

        <DeleteDocumentModal
          isOpen={isDeleteOpen}
          document={selectedDocument}
          onConfirm={handleDeleteConfirm}
          onClose={() => {
            setIsDeleteOpen(false);
            setSelectedDocument(null);
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default Documents;