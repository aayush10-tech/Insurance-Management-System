import { getDashboardSummaryService } from "../services/dashboard.service.js";
import ApiResponse from "../utils/apiResponse.js";

export const getDashboardSummary = async (req, res, next) => {
  try {
    const summary = await getDashboardSummaryService();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Dashboard summary fetched successfully",
        summary
      )
    );
  } catch (error) {
    next(error);
  }
};