import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import PaymentForm from "./PaymentForm";

import {
  createPayment,
  updatePayment,
} from "../../services/paymentService";

import { getPolicies } from "../../services/policyService";
import { paymentSchema } from "../../schemas/paymentSchema";

const defaultValues = {
  policyId: "",
  amount: "",
  paymentDate: "",
  paymentMethod: "",
  transactionId: "",
  status: "PAID",
  remarks: "",
};

const PaymentModal = ({
  isOpen,
  onClose,
  onSuccess,
  mode = "add",
  payment = null,
}) => {
  const [policies, setPolicies] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  });

  const loadPolicies = useCallback(async () => {
    try {
      const data = await getPolicies(1, 1000, "");
      setPolicies(data.policies || []);
    } catch (error) {
      console.error("Failed to load policies:", error);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    loadPolicies();

    if (mode === "edit" && payment) {
      reset({
        policyId: payment.policyId,
        amount: payment.amount,
        paymentDate: payment.paymentDate
          ? payment.paymentDate.substring(0, 10)
          : "",
        paymentMethod: payment.paymentMethod,
        transactionId: payment.transactionId || "",
        status: payment.status,
        remarks: payment.remarks || "",
      });
    } else {
      reset(defaultValues);
    }
  }, [isOpen, mode, payment, loadPolicies, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        policyId: Number(data.policyId),
        amount: Number(data.amount),
        paymentDate: new Date(data.paymentDate).toISOString(),
      };

      const response =
        mode === "edit"
          ? await updatePayment(payment.id, payload)
          : await createPayment(payload);

      if (response.success) {
        toast.success(
          mode === "edit"
            ? "Payment updated successfully"
            : "Payment added successfully"
        );

        reset(defaultValues);
        onSuccess?.();
        onClose?.();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Payment save failed:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-2xl font-bold">
            {mode === "edit"
              ? "Edit Payment"
              : "Add Payment"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-3xl transition hover:text-red-600"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-6"
        >
          <PaymentForm
            register={register}
            control={control}
            errors={errors}
            policies={policies}
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Saving..."
                : mode === "edit"
                ? "Update Payment"
                : "Save Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;