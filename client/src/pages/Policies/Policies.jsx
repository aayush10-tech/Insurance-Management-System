import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";

import usePolicies from "../../hooks/usePolicies";

import { renewPolicy } from "../../services/policyService";
import { createPayment } from "../../services/paymentService";

import PolicyTable from "../../components/policies/PolicyTable";
import PolicySearch from "../../components/policies/PolicySearch";
import PolicyPagination from "../../components/policies/PolicyPagination";
import PolicyModal from "../../components/policies/PolicyModal";
import ViewPolicyModal from "../../components/policies/ViewPolicyModal";
import CancelPolicyModal from "../../components/policies/CancelPolicyModal";
import RenewPolicyModal from "../../components/policies/RenewPolicyModal";
import ReceivePaymentModal from "../../components/policies/ReceivePaymentModal";
const Policies = () => {
  const {
    policies,
    loading,
    page,
    setPage,
    search,
    setSearch,
    totalPages,
    totalPolicies,
    refreshPolicies,
  } = usePolicies();

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [renewLoading, setRenewLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const handleAdd = () => {
    setSelectedPolicy(null);
    setShowAddEditModal(true);
  };

  const handleView = (id) => {
    const policy = policies.find((p) => p.id === id);

    if (!policy) return;

    setSelectedPolicy(policy);
    setShowViewModal(true);
  };

  const handleEdit = (id) => {
    const policy = policies.find((p) => p.id === id);

    if (!policy) return;

    setSelectedPolicy(policy);
    setShowAddEditModal(true);
  };

  const handleCancel = (policy) => {
    setSelectedPolicy(policy);
    setShowCancelModal(true);
  };

  const handleRenew = (policy) => {
    setSelectedPolicy(policy);
    setShowRenewModal(true);
  };

  const handleReceivePayment = (policy) => {
  setSelectedPolicy(policy);
  setShowPaymentModal(true);
};

  const handleRenewConfirm = async () => {
    if (!selectedPolicy) return;

    try {
      setRenewLoading(true);

      await renewPolicy(selectedPolicy.id);

      toast.success("Policy renewed successfully.");

      setShowRenewModal(false);
      setSelectedPolicy(null);

      refreshPolicies();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to renew policy."
      );
    } finally {
      setRenewLoading(false);
    }
  };
  const handleReceivePaymentConfirm = async (paymentData) => {
  try {
    setPaymentLoading(true);

    await createPayment(paymentData);

    toast.success("Premium payment received successfully.");

    setShowPaymentModal(false);
    setSelectedPolicy(null);

    refreshPolicies();
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Failed to receive payment."
    );
  } finally {
    setPaymentLoading(false);
  }
};

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">
              Policies
            </h1>

            <p className="text-slate-500 mt-2">
              Total Policies: {totalPolicies}
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            <FaPlus />
            Add Policy
          </button>
        </div>

        {/* Search */}
        <PolicySearch
          search={search}
          setSearch={setSearch}
          setPage={setPage}
        />

        {/* Table */}
        {loading ? (
          <div className="bg-white rounded-xl border py-20 text-center">
            Loading policies...
          </div>
        ) : (
          <>
            <PolicyTable
              policies={policies}
              onView={handleView}
              onEdit={handleEdit}
              onCancel={handleCancel}
              onRenew={handleRenew}
              onReceivePayment={handleReceivePayment}
            />

            <PolicyPagination
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              totalPolicies={totalPolicies}
            />
          </>
        )}

        {/* Add / Edit */}
        <PolicyModal
          isOpen={showAddEditModal}
          onClose={() => setShowAddEditModal(false)}
          onSuccess={refreshPolicies}
          mode={selectedPolicy ? "edit" : "add"}
          policy={selectedPolicy}
        />

        {/* View */}
        <ViewPolicyModal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          policy={selectedPolicy}
        />

        {/* Cancel */}
        <CancelPolicyModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          policy={selectedPolicy}
          onSuccess={refreshPolicies}
        />

        {/* Renew */}
        <RenewPolicyModal
          isOpen={showRenewModal}
          onClose={() => setShowRenewModal(false)}
          policy={selectedPolicy}
          loading={renewLoading}
          onConfirm={handleRenewConfirm}
        />
        <ReceivePaymentModal
  isOpen={showPaymentModal}
  onClose={() => {
  setShowPaymentModal(false);
  setSelectedPolicy(null);
}}
  policy={selectedPolicy}
  loading={paymentLoading}
  onConfirm={handleReceivePaymentConfirm}
/>
      </div>
    </DashboardLayout>
  );
};

export default Policies;