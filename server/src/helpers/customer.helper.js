import ApiError from "../utils/apiError.js";
import { getCustomerByIdService } from "../services/customer.service.js";

export const findCustomerOrThrow = async (id) => {
  const customer = await getCustomerByIdService(id);

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  return customer;
};