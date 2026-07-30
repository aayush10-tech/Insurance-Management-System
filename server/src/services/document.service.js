import prisma from "../config/prisma.js";

// Upload Document
export const uploadDocumentService = async (documentData) => {
  return await prisma.document.create({
    data: documentData,
    include: {
      customer: true,
    },
  });
};

// Get All Documents (Pagination + Search)
export const getAllDocumentsService = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          {
            documentName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            documentType: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            customer: {
              OR: [
                {
                  firstName: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  lastName: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            },
          },
        ],
      }
    : {};

  const [documents, totalDocuments] = await Promise.all([
    prisma.document.findMany({
      where,
      skip,
      take: limit,
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.document.count({
      where,
    }),
  ]);

  return {
    documents,
    totalDocuments,
    page,
    limit,
    totalPages: Math.ceil(totalDocuments / limit),
  };
};

// Get Document By ID
export const getDocumentByIdService = async (id) => {
  return await prisma.document.findUnique({
    where: { id },
    include: {
      customer: true,
    },
  });
};

// Update Document
export const updateDocumentService = async (id, data) => {
  return await prisma.document.update({
    where: { id },
    data,
    include: {
      customer: true,
    },
  });
};

// Delete Document
export const deleteDocumentService = async (id) => {
  return await prisma.document.delete({
    where: { id },
  });
};