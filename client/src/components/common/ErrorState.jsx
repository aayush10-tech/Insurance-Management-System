import { TriangleAlert } from "lucide-react";

const ErrorState = ({
  message = "Something went wrong.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <TriangleAlert
        size={45}
        className="text-red-500"
      />

      <h2 className="mt-5 text-xl font-semibold">
        Error
      </h2>

      <p className="mt-2 text-slate-500">
        {message}
      </p>
    </div>
  );
};

export default ErrorState;