import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import CustomerForm from "./CustomerForm";
import { customerSchema } from "../../schemas/customerSchema";

import {
  createCustomer,
  updateCustomer,
} from "../../services/customerService";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  occupation: "",
  annualIncome: "",
  aadhaarNumber: "",
  panNumber: "",
};

const CustomerModal = ({
  isOpen,
  onClose,
  onSuccess,
  mode = "add",
  customer = null,
}) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && customer) {
      reset({
        ...customer,
        dateOfBirth: customer.dateOfBirth
          ? customer.dateOfBirth.substring(0, 10)
          : "",
        annualIncome: customer.annualIncome ?? "",
      });
    } else {
      reset(defaultValues);
    }
  }, [isOpen, mode, customer, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        annualIncome: Number(data.annualIncome),
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
        panNumber: data.panNumber.toUpperCase(),
      };

      let response;

      if (mode === "edit") {
        response = await updateCustomer(customer.id, payload);
      } else {
        response = await createCustomer(payload);
      }

      if (response.success) {
        toast.success(
          mode === "edit"
            ? "Customer updated successfully"
            : "Customer added successfully"
        );

        reset(defaultValues);

        onSuccess?.();
        onClose?.();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);

      if (
        error.response?.data?.errors?.length
      ) {
        toast.error(
          error.response.data.errors[0].message
        );
      } else {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong"
        );
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center border-b px-6 py-5">

          <h2 className="text-2xl font-bold">
            {mode === "edit"
              ? "Edit Customer"
              : "Add Customer"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-3xl hover:text-red-600"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-6"
        >
          <CustomerForm
            register={register}
            control={control}
            errors={errors}
          />

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              {isSubmitting
                ? "Saving..."
                : mode === "edit"
                ? "Update Customer"
                : "Save Customer"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CustomerModal;