import { Inbox } from "lucide-react";

const EmptyState = ({
  title = "No Data Found",
  description = "There is nothing to display.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="rounded-full bg-slate-100 p-5">
        <Inbox
          size={40}
          className="text-slate-500"
        />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-slate-700">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;