import { Controller } from "react-hook-form";

const PaymentForm = ({
  control,
  register,
  errors,
  policies = [],
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      {/* Policy */}
      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">
          Policy
        </label>

        <Controller
          control={control}
          name="policyId"
          render={({ field }) => (
            <select
              {...field}
              className="w-full border rounded-lg p-3"
            >
              <option value="">
                Select Policy
              </option>

              {policies.map((policy) => (
                <option
                  key={policy.id}
                  value={policy.id}
                >
                  {policy.policyNumber} -{" "}
                  {policy.customer.firstName}{" "}
                  {policy.customer.lastName}
                </option>
              ))}
            </select>
          )}
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.policyId?.message}
        </p>
      </div>

      {/* Amount */}
      <div>
        <label className="block mb-2 font-medium">
          Amount
        </label>

        <input
          type="number"
          step="0.01"
          {...register("amount")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.amount?.message}
        </p>
      </div>

      {/* Payment Date */}
      <div>
        <label className="block mb-2 font-medium">
          Payment Date
        </label>

        <input
          type="date"
          {...register("paymentDate")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.paymentDate?.message}
        </p>
      </div>

      {/* Payment Method */}
      <div>
        <label className="block mb-2 font-medium">
          Payment Method
        </label>

        <Controller
          control={control}
          name="paymentMethod"
          render={({ field }) => (
            <select
              {...field}
              className="w-full border rounded-lg p-3"
            >
              <option value="">
                Select Method
              </option>
              <option value="CASH">
                Cash
              </option>
              <option value="UPI">
                UPI
              </option>
              <option value="CARD">
                Card
              </option>
              <option value="NET_BANKING">
                Net Banking
              </option>
            </select>
          )}
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.paymentMethod?.message}
        </p>
      </div>

      {/* Status */}
      <div>
        <label className="block mb-2 font-medium">
          Status
        </label>

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <select
              {...field}
              className="w-full border rounded-lg p-3"
            >
              <option value="">
                Select Status
              </option>
              <option value="PAID">
                PAID
              </option>
              <option value="PENDING">
                PENDING
              </option>
              <option value="FAILED">
                FAILED
              </option>
            </select>
          )}
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.status?.message}
        </p>
      </div>

      {/* Transaction ID */}
      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">
          Transaction ID
        </label>

        <input
          {...register("transactionId")}
          className="w-full border rounded-lg p-3"
          placeholder="Optional"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.transactionId?.message}
        </p>
      </div>

      {/* Remarks */}
      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">
          Remarks
        </label>

        <textarea
          rows={3}
          {...register("remarks")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.remarks?.message}
        </p>
      </div>

    </div>
  );
};

export default PaymentForm;