import ApiResponse from "../utils/apiResponse.js";

const errorMiddleware = (err, req, res, next) => {
  if (err.statusCode >= 500 || !err.statusCode) {
    console.error(err);
  }

  return res.status(err.statusCode || 500).json(
    new ApiResponse(
      err.statusCode || 500,
      err.message || "Internal Server Error"
    )
  );
};

export default errorMiddleware;