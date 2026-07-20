import {
  createCustomerService,
  getAllCustomersService,
  getCustomerByIdService,
} from "../services/customer.service.js";

import ApiResponse from "../utils/apiResponse.js";

// Create Customer
export const createCustomer = async (req, res) => {
  try {
    const customer = await createCustomerService(req.body);

    return res.status(201).json(
      new ApiResponse(201, "Customer created successfully", {
        customer,
      })
    );
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json(new ApiResponse(500, "Internal Server Error"));
  }
};

// Get All Customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await getAllCustomersService();

    return res.status(200).json(
      new ApiResponse(200, "Customers fetched successfully", {
        count: customers.length,
        customers,
      })
    );
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json(new ApiResponse(500, "Internal Server Error"));
  }
};
export const getCustomerById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const customer = await getCustomerByIdService(id);

    if (!customer) {
      return res.status(404).json(
        new ApiResponse(404, "Customer not found")
      );
    }

    return res.status(200).json(
      new ApiResponse(200, "Customer fetched successfully", {
        customer,
      })
    );
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json(new ApiResponse(500, "Internal Server Error"));
  }
};