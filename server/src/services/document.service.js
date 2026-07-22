import prisma from "../config/prisma.js";

export const uploadDocumentService = async (documentData) => {
  return await prisma.document.create({
    data: documentData,
    include: {
      customer: true,
    },
  });
};

export const getAllDocumentsService = async () => {
  return await prisma.document.findMany({
    include: {
      customer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getDocumentByIdService = async (id) => {
  return await prisma.document.findUnique({
    where: { id },
    include: {
      customer: true,
    },
  });
};

export const updateDocumentService = async (id, data) => {
  return await prisma.document.update({
    where: { id },
    data,
    include: {
      customer: true,
    },
  });
};

export const deleteDocumentService = async (id) => {
  return await prisma.document.delete({
    where: { id },
  });
};