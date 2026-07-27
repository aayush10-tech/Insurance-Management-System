import { Controller } from "react-hook-form";

const CustomerForm = ({ control, register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      {/* First Name */}
      <div>
        <label className="block mb-2 font-medium">
          First Name
        </label>

        <input
          {...register("firstName")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.firstName?.message}
        </p>
      </div>

      {/* Last Name */}

      <div>
        <label className="block mb-2 font-medium">
          Last Name
        </label>

        <input
          {...register("lastName")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.lastName?.message}
        </p>
      </div>

      {/* Email */}

      <div>
        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
          {...register("email")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.email?.message}
        </p>
      </div>

      {/* Phone */}

      <div>
        <label className="block mb-2 font-medium">
          Phone
        </label>

        <input
          {...register("phone")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.phone?.message}
        </p>
      </div>

      {/* Gender */}

      <div>
        <label className="block mb-2 font-medium">
          Gender
        </label>

        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <select
              {...field}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          )}
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.gender?.message}
        </p>
      </div>

      {/* Date of Birth */}

      <div>
        <label className="block mb-2 font-medium">
          Date of Birth
        </label>

        <input
          type="date"
          {...register("dateOfBirth")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.dateOfBirth?.message}
        </p>
      </div>

      {/* Address */}

      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">
          Address
        </label>

        <textarea
          {...register("address")}
          rows={3}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.address?.message}
        </p>
      </div>

      {/* City */}

      <div>
        <label className="block mb-2 font-medium">
          City
        </label>

        <input
          {...register("city")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.city?.message}
        </p>
      </div>

      {/* State */}

      <div>
        <label className="block mb-2 font-medium">
          State
        </label>

        <input
          {...register("state")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.state?.message}
        </p>
      </div>

      {/* Pincode */}

      <div>
        <label className="block mb-2 font-medium">
          Pincode
        </label>

        <input
          {...register("pincode")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.pincode?.message}
        </p>
      </div>

      {/* Occupation */}

      <div>
        <label className="block mb-2 font-medium">
          Occupation
        </label>

        <input
          {...register("occupation")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.occupation?.message}
        </p>
      </div>

      {/* Income */}

      <div>
        <label className="block mb-2 font-medium">
          Annual Income
        </label>

        <input
          type="number"
          {...register("annualIncome")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.annualIncome?.message}
        </p>
      </div>

      {/* Aadhaar */}

      <div>
        <label className="block mb-2 font-medium">
          Aadhaar Number
        </label>

        <input
          {...register("aadhaarNumber")}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.aadhaarNumber?.message}
        </p>
      </div>

      {/* PAN */}

      <div>
        <label className="block mb-2 font-medium">
          PAN Number
        </label>

        <input
          {...register("panNumber")}
          className="w-full border rounded-lg p-3 uppercase"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.panNumber?.message}
        </p>
      </div>

    </div>
  );
};

export default CustomerForm;