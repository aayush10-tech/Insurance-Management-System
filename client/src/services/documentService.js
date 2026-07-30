import axiosInstance from "./axiosInstance";

// Get All Documents
export const getDocuments = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const response = await axiosInstance.get("/documents", {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data.data;
};

// Get Document By ID
export const getDocumentById = async (id) => {
  const response = await axiosInstance.get(`/documents/${id}`);
  return response.data.data;
};

// Upload Document
export const uploadDocument = async (formData) => {
  const response = await axiosInstance.post(
    "/documents",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Update Document
export const updateDocument = async (id, data) => {
  const response = await axiosInstance.put(
    `/documents/${id}`,
    data
  );

  return response.data;
};

// Delete Document
export const deleteDocument = async (id) => {
  const response = await axiosInstance.delete(
    `/documents/${id}`
  );

  return response.data;
};

// Download Document
export const downloadDocument = (id) => {
  window.open(
    `${import.meta.env.VITE_API_URL}/documents/${id}/download`,
    "_blank"
  );
};