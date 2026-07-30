import { useEffect, useState } from "react";
import { getCustomers } from "../../services/customerService";

const PolicyForm = ({
  register,
  errors,
  mode = "add",
}) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers(1, 1000, "");
        setCustomers(data.customers || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Customer */}

      <div>
        <label className="block mb-2 font-medium">
          Customer
        </label>

        <select
          {...register("customerId")}
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="">Select Customer</option>

          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.firstName} {customer.lastName}
            </option>
          ))}
        </select>

        <p className="text-red-500 text-sm mt-1">
          {errors.customerId?.message}
        </p>
      </div>

      {/* Policy Name */}

      <div>
        <label className="block mb-2 font-medium">
          Policy Name
        </label>

        <input
          {...register("policyName")}
          className="w-full border rounded-lg px-4 py-3"
          placeholder="Enter policy name"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.policyName?.message}
        </p>
      </div>

      {/* Policy Type */}

      <div>
        <label className="block mb-2 font-medium">
          Policy Type
        </label>

        <select
          {...register("policyType")}
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="">Select Type</option>
          <option value="LIFE">Life</option>
          <option value="HEALTH">Health</option>
          <option value="MOTOR">Motor</option>
          <option value="HOME">Home</option>
          <option value="TRAVEL">Travel</option>
        </select>

        <p className="text-red-500 text-sm mt-1">
          {errors.policyType?.message}
        </p>
      </div>

      {/* Payment Frequency */}

      <div>
        <label className="block mb-2 font-medium">
          Payment Frequency
        </label>

        <select
          {...register("paymentFrequency")}
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="">Select Frequency</option>
          <option value="MONTHLY">Monthly</option>
          <option value="QUARTERLY">Quarterly</option>
          <option value="HALF_YEARLY">Half Yearly</option>
          <option value="YEARLY">Yearly</option>
        </select>

        <p className="text-red-500 text-sm mt-1">
          {errors.paymentFrequency?.message}
        </p>
      </div>

      {/* Premium */}

      <div>
        <label className="block mb-2 font-medium">
          Premium Amount
        </label>

        <input
          type="number"
          {...register("premiumAmount")}
          className="w-full border rounded-lg px-4 py-3"
          placeholder="Enter premium amount"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.premiumAmount?.message}
        </p>
      </div>

      {/* Coverage */}

      <div>
        <label className="block mb-2 font-medium">
          Coverage Amount
        </label>

        <input
          type="number"
          {...register("coverageAmount")}
          className="w-full border rounded-lg px-4 py-3"
          placeholder="Enter coverage amount"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.coverageAmount?.message}
        </p>
      </div>

      {/* Start Date */}

      <div>
        <label className="block mb-2 font-medium">
          Start Date
        </label>

        <input
          type="date"
          {...register("startDate")}
          className="w-full border rounded-lg px-4 py-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.startDate?.message}
        </p>
      </div>

      {/* End Date */}

      <div>
        <label className="block mb-2 font-medium">
          End Date
        </label>

        <input
          type="date"
          {...register("endDate")}
          className="w-full border rounded-lg px-4 py-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.endDate?.message}
        </p>
      </div>

      {/* Description */}

      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          rows={4}
          {...register("description")}
          className="w-full border rounded-lg px-4 py-3"
          placeholder="Enter policy description"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.description?.message}
        </p>
      </div>

      {/* Status (Edit Mode Only) */}

      {mode === "edit" && (
        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            {...register("status")}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="ACTIVE">Active</option>
            <option value="EXPIRED">Expired</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <p className="text-red-500 text-sm mt-1">
            {errors.status?.message}
          </p>
        </div>
      )}

    </div>
  );
};

export default PolicyForm;