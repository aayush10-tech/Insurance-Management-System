import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { userSchema } from "../../schemas/userSchema";

const UserForm = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "AGENT",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        fullName: initialData.fullName,
        email: initialData.email,
        password: "",
        confirmPassword: "",
        role: initialData.role,
      });
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label className="block mb-1 font-medium">
          Full Name
        </label>

        <input
          {...register("fullName")}
          className="w-full p-2 border rounded-lg"
        />

        {errors.fullName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Email
        </label>

        <input
          type="email"
          {...register("email")}
          className="w-full p-2 border rounded-lg"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Password
        </label>

        <input
          type="password"
          {...register("password")}
          className="w-full p-2 border rounded-lg"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Confirm Password
        </label>

        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full p-2 border rounded-lg"
        />

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Role
        </label>

        <select
          {...register("role")}
          className="w-full p-2 border rounded-lg"
        >
          <option value="AGENT">AGENT</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        {errors.role && (
          <p className="mt-1 text-sm text-red-500">
            {errors.role.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {isEdit ? "Update User" : "Create User"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;