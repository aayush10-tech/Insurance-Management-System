import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PaymentTable from "../../components/payments/PaymentTable";
import PaymentSearch from "../../components/payments/PaymentSearch";
import PaymentPagination from "../../components/payments/PaymentPagination";
import PaymentModal from "../../components/payments/PaymentModal";
import ViewPaymentModal from "../../components/payments/ViewPaymentModal";
import DeletePaymentModal from "../../components/payments/DeletePaymentModal";

import usePayments from "../../hooks/usePayments";

import { getPaymentById } from "../../services/paymentService";

import { exportPdf } from "../../utils/exportPdf";
import { exportExcel } from "../../utils/exportExcel";

const Payments = () => {
  const {
    payments,
    loading,
    page,
    totalPages,
    totalPayments,
    search,
    setSearch,
    status,
    setStatus,
    paymentMethod,
    setPaymentMethod,
    setPage,
    refreshPayments,
  } = usePayments();

  // Add Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Edit Modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPayment, setEditPayment] = useState(null);

  // View Modal
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Delete Modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletePaymentData, setDeletePaymentData] = useState(null);

  const handleView = async (id) => {
    try {
      const payment = await getPaymentById(id);
      setSelectedPayment(payment);
      setIsViewOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const payment = await getPaymentById(id);
      setEditPayment(payment);
      setIsEditOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (payment) => {
    setDeletePaymentData(payment);
    setIsDeleteOpen(true);
  };

  const handleExportPDF = () => {
    exportPdf({
      title: "Premium Payments Report",
      fileName: "payments-report.pdf",
      columns: [
        "Policy",
        "Customer",
        "Amount",
        "Method",
        "Status",
        "Date",
      ],
      rows: payments.map((payment) => [
        payment.policy?.policyNumber,
        `${payment.policy?.customer?.firstName || ""} ${
          payment.policy?.customer?.lastName || ""
        }`,
        `₹${payment.amount}`,
        payment.paymentMethod,
        payment.status,
        new Date(payment.paymentDate).toLocaleDateString(),
      ]),
    });
  };

  const handleExportExcel = () => {
    exportExcel({
      fileName: "payments-report",
      data: payments,
      columnMapping: {
        Policy: (p) => p.policy?.policyNumber,
        Customer: (p) =>
          `${p.policy?.customer?.firstName || ""} ${
            p.policy?.customer?.lastName || ""
          }`,
        Amount: "amount",
        Method: "paymentMethod",
        Status: "status",
        Date: (p) =>
          new Date(p.paymentDate).toLocaleDateString(),
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

          <div>
            <h1 className="text-4xl font-bold">
              Premium Payments
            </h1>

            <p className="text-slate-500 mt-2">
              Total Payments: {totalPayments}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={handleExportPDF}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
            >
              📄 Export PDF
            </button>

            <button
              onClick={handleExportExcel}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
            >
              📊 Export Excel
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
            >
              + Add Payment
            </button>

          </div>

        </div>

        <PaymentSearch
          search={search}
          setSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
          status={status}
          setStatus={setStatus}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />

        {loading ? (
          <div className="bg-white rounded-xl border py-20 text-center">
            Loading...
          </div>
        ) : (
          <>
            <PaymentTable
              payments={payments}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <PaymentPagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
                {/* Add Payment */}
        <PaymentModal
          isOpen={isModalOpen}
          mode="add"
          onSuccess={refreshPayments}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Edit Payment */}
        <PaymentModal
          isOpen={isEditOpen}
          mode="edit"
          payment={editPayment}
          onSuccess={refreshPayments}
          onClose={() => {
            setIsEditOpen(false);
            setEditPayment(null);
          }}
        />

        {/* View Payment */}
        <ViewPaymentModal
          isOpen={isViewOpen}
          payment={selectedPayment}
          onClose={() => {
            setIsViewOpen(false);
            setSelectedPayment(null);
          }}
        />

        {/* Delete Payment */}
        <DeletePaymentModal
          isOpen={isDeleteOpen}
          payment={deletePaymentData}
          onSuccess={refreshPayments}
          onClose={() => {
            setIsDeleteOpen(false);
            setDeletePaymentData(null);
          }}
        />

      </div>
    </DashboardLayout>
  );
};

export default Payments;