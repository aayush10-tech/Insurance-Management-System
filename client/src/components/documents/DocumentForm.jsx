import { Controller } from "react-hook-form";

const DocumentForm = ({
  register,
  control,
  errors,
  customers = [],
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      {/* Document Name */}
      <div>
        <label className="block mb-2 font-medium">
          Document Name
        </label>

        <input
          {...register("documentName")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.documentName?.message}
        </p>
      </div>

      {/* Document Type */}
      <div>
        <label className="block mb-2 font-medium">
          Document Type
        </label>

        <input
          {...register("documentType")}
          placeholder="Policy, Aadhaar, PAN, Claim..."
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.documentType?.message}
        </p>
      </div>

      {/* Customer */}
      <div>
        <label className="block mb-2 font-medium">
          Customer
        </label>

        <Controller
          name="customerId"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="w-full border rounded-lg p-3"
            >
              <option value="">
                Select Customer
              </option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.firstName} {customer.lastName}
                </option>
              ))}
            </select>
          )}
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.customerId?.message}
        </p>
      </div>

      {/* File Upload */}
      <div>
        <label className="block mb-2 font-medium">
          Upload File
        </label>

        <input
          type="file"
          {...register("file")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.file?.message}
        </p>
      </div>

    </div>
  );
};

export default DocumentForm;