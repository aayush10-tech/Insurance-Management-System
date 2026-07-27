import { FaTimes } from "react-icons/fa";

const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-slate-500">{label}</p>
    <p className="font-semibold text-slate-800 break-words">
      {value || "-"}
    </p>
  </div>
);

const ViewCustomerModal = ({
  isOpen,
  customer,
  onClose,
}) => {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b px-6 py-5">

          <div>
            <h2 className="text-2xl font-bold">
              Customer Details
            </h2>

            <p className="text-slate-500">
              View customer information
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-xl hover:text-red-600"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          <Detail
            label="First Name"
            value={customer.firstName}
          />

          <Detail
            label="Last Name"
            value={customer.lastName}
          />

          <Detail
            label="Email"
            value={customer.email}
          />

          <Detail
            label="Phone"
            value={customer.phone}
          />

          <Detail
            label="Gender"
            value={customer.gender}
          />

          <Detail
            label="Date of Birth"
            value={new Date(
              customer.dateOfBirth
            ).toLocaleDateString()}
          />

          <Detail
            label="Address"
            value={customer.address}
          />

          <Detail
            label="City"
            value={customer.city}
          />

          <Detail
            label="State"
            value={customer.state}
          />

          <Detail
            label="Pincode"
            value={customer.pincode}
          />

          <Detail
            label="Occupation"
            value={customer.occupation}
          />

          <Detail
            label="Annual Income"
            value={`₹${Number(
              customer.annualIncome
            ).toLocaleString("en-IN")}`}
          />

          <Detail
            label="PAN Number"
            value={customer.panNumber}
          />

          <Detail
            label="Aadhaar Number"
            value={customer.aadhaarNumber}
          />

        </div>

        {/* Footer */}

        <div className="border-t px-6 py-4 flex justify-end">

          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default ViewCustomerModal;