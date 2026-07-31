import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import PolicyForm from "./PolicyForm";
import { policySchema } from "../../schemas/policySchema";

import {
  createPolicy,
  updatePolicy,
} from "../../services/policyService";

const defaultValues = {
  customerId: "",
  policyName: "",
  policyType: "",
  description: "",
  premiumAmount: "",
  coverageAmount: "",
  paymentFrequency: "",
  startDate: "",
  endDate: "",
  status: "ACTIVE",
};

const PolicyModal = ({
  isOpen,
  onClose,
  onSuccess,
  mode = "add",
  policy = null,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(policySchema),
    defaultValues,
  });

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && policy) {
      reset({
        customerId: policy.customerId,
        policyName: policy.policyName,
        policyType: policy.policyType,
        description: policy.description || "",
        premiumAmount: policy.premiumAmount,
        coverageAmount: policy.coverageAmount,
        paymentFrequency: policy.paymentFrequency,
        startDate: policy.startDate?.substring(0, 10),
        endDate: policy.endDate?.substring(0, 10),
        status: policy.status,
      });
    } else {
      reset(defaultValues);
    }
  }, [isOpen, mode, policy, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        customerId: Number(data.customerId),
        premiumAmount: Number(data.premiumAmount),
        coverageAmount: Number(data.coverageAmount),
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };

      let response;

      if (mode === "edit") {
        console.log("Payload being sent:", payload);
        response = await updatePolicy(policy.id, payload);
      } else {
        response = await createPolicy(payload);
      }

      if (response.success) {
        toast.success(
          mode === "edit"
            ? "Policy updated successfully"
            : "Policy created successfully"
        );

        reset(defaultValues);

        onSuccess?.();
        onClose?.();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);

      if (error.response?.data?.errors?.length) {
        toast.error(error.response.data.errors[0].message);
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
              ? "Edit Policy"
              : "Add Policy"}
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
          <PolicyForm
            register={register}
            errors={errors}
            mode={mode}
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
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : mode === "edit"
                ? "Update Policy"
                : "Save Policy"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default PolicyModal;