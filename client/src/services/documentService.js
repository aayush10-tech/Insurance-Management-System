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
export const downloadDocument = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/documents/${id}/download`,
      {
        responseType: "blob",
      }
    );

    // Create file URL
    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    // Create download link
    const link = document.createElement("a");

    link.href = url;

    // Try to get filename from response header
    const disposition =
      response.headers["content-disposition"];

    let fileName = `document-${id}`;

    if (disposition) {
      const match = disposition.match(/filename="?(.+?)"?$/);

      if (match) {
        fileName = match[1];
      }
    }

    link.setAttribute("download", fileName);

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);

    alert(
      error.response?.data?.message ||
        "Failed to download document."
    );
  }
};