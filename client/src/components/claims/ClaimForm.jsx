import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { claimSchema } from "../../schemas/claimSchema";
import { getPolicies } from "../../services/policyService";

const ClaimForm = ({
  initialData,
  onSubmit,
  loading,
}) => {
  const [policies, setPolicies] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      claimNumber: "",
      claimAmount: "",
      claimReason: "",
      incidentDate: "",
      description: "",
      status: "PENDING",
      remarks: "",
      policyId: "",
    },
  });

  useEffect(() => {
    const loadPolicies = async () => {
      try {
        const data = await getPolicies(1, 1000, "");
        setPolicies(data.policies || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadPolicies();
  }, []);

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        incidentDate: initialData.incidentDate
          ? initialData.incidentDate.substring(0, 10)
          : "",
        policyId: initialData.policyId,
      });
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="block mb-1 font-medium">
          Claim Number
        </label>

        <input
          {...register("claimNumber")}
          className="w-full border rounded-lg p-2"
        />

        <p className="text-red-500 text-sm">
          {errors.claimNumber?.message}
        </p>
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Policy
        </label>

        <select
          {...register("policyId", { valueAsNumber: true })}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Select Policy</option>

          {policies.map((policy) => (
            <option
              key={policy.id}
              value={policy.id}
            >
              {policy.policyNumber}
            </option>
          ))}
        </select>

        <p className="text-red-500 text-sm">
          {errors.policyId?.message}
        </p>
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Claim Amount
        </label>

        <input
          type="number"
          {...register("claimAmount", {
            valueAsNumber: true,
          })}
          className="w-full border rounded-lg p-2"
        />

        <p className="text-red-500 text-sm">
          {errors.claimAmount?.message}
        </p>
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Claim Reason
        </label>

        <input
          {...register("claimReason")}
          className="w-full border rounded-lg p-2"
        />

        <p className="text-red-500 text-sm">
          {errors.claimReason?.message}
        </p>
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Incident Date
        </label>

        <input
          type="date"
          {...register("incidentDate")}
          className="w-full border rounded-lg p-2"
        />

        <p className="text-red-500 text-sm">
          {errors.incidentDate?.message}
        </p>
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Description
        </label>

        <textarea
          rows={3}
          {...register("description")}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Status
        </label>

        <select
          {...register("status")}
          className="w-full border rounded-lg p-2"
        >
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Remarks
        </label>

        <textarea
          rows={3}
          {...register("remarks")}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Claim"}
        </button>
      </div>
    </form>
  );
};

export default ClaimForm;