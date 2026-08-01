import {
  uploadDocumentService,
  getAllDocumentsService,
  getDocumentByIdService,
  updateDocumentService,
  deleteDocumentService,
} from "../services/document.service.js";
import path from "path";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import fs from "fs";

const formatDocument = (req, document) => {
  return {
    ...document,
    fileUrl: `${req.protocol}://${req.get("host")}/${document.filePath.replace(/\\/g, "/")}`,
  };
};

// Upload Document
export const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, "No file uploaded.");
    }

    const { documentName, documentType, customerId } = req.body;

    const document = await uploadDocumentService({
      documentName,
      documentType,
      customerId: Number(customerId),
      fileName: req.file.originalname,
      filePath: `uploads/documents/${req.file.filename}`,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        "Document uploaded successfully",
        formatDocument(req, document)
      )
    );
  } catch (error) {
    next(error);
  }
};

// Get All Documents
export const getAllDocuments = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const result = await getAllDocumentsService(
      page,
      limit,
      search
    );

    const formattedDocuments = result.documents.map((doc) =>
      formatDocument(req, doc)
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Documents fetched successfully",
        {
          documents: formattedDocuments,
          totalDocuments: result.totalDocuments,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages,
        }
      )
    );
  } catch (error) {
    next(error);
  }
};

// Get Document By ID
export const getDocumentById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const document = await getDocumentByIdService(id);

    if (!document) {
      throw new ApiError(404, "Document not found");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        "Document fetched successfully",
        formatDocument(req, document)
      )
    );
  } catch (error) {
    next(error);
  }
};

// Update Document
export const updateDocument = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const document = await getDocumentByIdService(id);

    if (!document) {
      throw new ApiError(404, "Document not found");
    }

    const updatedDocument = await updateDocumentService(id, {
      documentName: req.body.documentName,
      documentType: req.body.documentType,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Document updated successfully",
        formatDocument(req, updatedDocument)
      )
    );
  } catch (error) {
    next(error);
  }
};

// Delete Document
export const deleteDocument = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const document = await getDocumentByIdService(id);

    if (!document) {
      throw new ApiError(404, "Document not found");
    }

    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    await deleteDocumentService(id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Document deleted successfully",
        null
      )
    );
  } catch (error) {
    next(error);
  }
};
// Download Document
export const downloadDocument = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const document = await getDocumentByIdService(id);

    if (!document) {
      throw new ApiError(404, "Document not found");
    }

    const filePath = path.resolve(document.filePath);

    res.setHeader(
      "Access-Control-Expose-Headers",
      "Content-Disposition"
    );

    return res.download(filePath, document.fileName);

    } catch (error) {
    next(error);
  }
};