import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import DocumentForm from "./DocumentForm";
import { documentSchema } from "../../schemas/documentSchema";

const DocumentModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  customers,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      documentName: "",
      documentType: "",
      customerId: "",
      file: null,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        documentName: initialData.documentName,
        documentType: initialData.documentType,
        customerId: initialData.customerId,
        file: null,
      });
    } else {
      reset({
        documentName: "",
        documentType: "",
        customerId: "",
        file: null,
      });
    }
  }, [initialData, reset]);

  if (!isOpen) return null;

  const submitHandler = (data) => {
    const formData = new FormData();

    formData.append("documentName", data.documentName);
    formData.append("documentType", data.documentType);
    formData.append("customerId", data.customerId);

    if (data.file && data.file[0]) {
      formData.append("file", data.file[0]);
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg">

        <h2 className="mb-6 text-2xl font-bold">
          {initialData ? "Edit Document" : "Upload Document"}
        </h2>

        <form onSubmit={handleSubmit(submitHandler)}>

          <DocumentForm
            register={register}
            control={control}
            errors={errors}
            customers={customers}
          />

          <div className="mt-6 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              {initialData ? "Update" : "Upload"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default DocumentModal;