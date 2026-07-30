const ViewClaimModal = ({
  isOpen,
  onClose,
  claim,
}) => {
  if (!isOpen || !claim) return null;

  const customerName = claim.policy?.customer
    ? `${claim.policy.customer.firstName} ${claim.policy.customer.lastName}`
    : "-";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">

        <div className="flex justify-between items-center border-b px-6 py-4">

          <h2 className="text-xl font-semibold">
            Claim Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>

        </div>

        <div className="p-6 space-y-4">

          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="text-sm text-gray-500">
                Claim Number
              </p>
              <p className="font-medium">
                {claim.claimNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Policy Number
              </p>
              <p className="font-medium">
                {claim.policy?.policyNumber || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Customer
              </p>
              <p className="font-medium">
                {customerName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Claim Amount
              </p>
              <p className="font-medium">
                ₹{Number(claim.claimAmount).toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Incident Date
              </p>
              <p className="font-medium">
                {new Date(claim.incidentDate).toLocaleDateString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>
              <p className="font-medium">
                {claim.status}
              </p>
            </div>

          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">
              Claim Reason
            </p>

            <p className="border rounded-lg p-3 bg-gray-50">
              {claim.claimReason}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">
              Description
            </p>

            <p className="border rounded-lg p-3 bg-gray-50 min-h-[80px]">
              {claim.description || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">
              Remarks
            </p>

            <p className="border rounded-lg p-3 bg-gray-50 min-h-[80px]">
              {claim.remarks || "-"}
            </p>
          </div>

        </div>

        <div className="flex justify-end border-t px-6 py-4">

          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default ViewClaimModal;