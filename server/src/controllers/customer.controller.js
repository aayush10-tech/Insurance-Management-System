import { createCustomerService } from "../services/customer.service.js";
import ApiResponse from "../utils/apiResponse.js";

export const createCustomer = async (req, res) => {
  try {
    const customer = await createCustomerService(req.body);

    return res.status(201).json(
      new ApiResponse(
        201,
        "Customer created successfully",
        {
          customer,
        }
      )
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json(
      new ApiResponse(
        500,
        "Internal Server Error"
      )
    );
  }
};