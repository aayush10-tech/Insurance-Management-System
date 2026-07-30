import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

import {
  getDashboardReportService,
} from "../services/report.service.js";

// Dashboard Report
export const getDashboardReport = asyncHandler(async (req, res) => {
  const report = await getDashboardReportService();

  res.status(200).json(
    new ApiResponse(
      200,
      "Dashboard report fetched successfully",
      report
    )
  );
});