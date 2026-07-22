import multer from "multer";
import path from "path";
import fs from "fs";

// Upload directory
const uploadPath = path.join(process.cwd(), "uploads", "documents");

// Create uploads/documents folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname).toLowerCase();

    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  console.log("========== FILE INFO ==========");
  console.log("Original Name :", file.originalname);
  console.log("MIME Type     :", file.mimetype);
  console.log("Extension     :", extension);
  console.log("===============================");

  const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".png"];

  const allowedMimeTypes = [
    "application/pdf",
    "application/octet-stream",
    "image/jpeg",
    "image/png",
  ];

  if (
    allowedExtensions.includes(extension) &&
    allowedMimeTypes.includes(file.mimetype)
  ) {
    return cb(null, true);
  }

  return cb(
    new Error(
      "Only PDF, JPG, JPEG and PNG files are allowed."
    ),
    false
  );
};

// Multer upload instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export default upload;