import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import ClaimTable from "../../components/claims/ClaimTable";
import ClaimSearch from "../../components/claims/ClaimSearch";
import ClaimPagination from "../../components/claims/ClaimPagination";
import ClaimModal from "../../components/claims/ClaimModal";
import ViewClaimModal from "../../components/claims/ViewClaimModal";
import DeleteClaimModal from "../../components/claims/DeleteClaimModal";

import useClaims from "../../hooks/useClaims";
import { getClaimById } from "../../services/claimService";

const Claims = () => {
  const {
    claims,
    loading,
    search,
    setSearch,
    page,
    setPage,
    totalClaims,
    totalPages,
    refreshClaims,
  } = useClaims();

  const [isAddOpen, setIsAddOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editClaim, setEditClaim] = useState(null);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteClaimData, setDeleteClaimData] = useState(null);

  const handleView = async (id) => {
    try {
      const claim = await getClaimById(id);
      setSelectedClaim(claim);
      setIsViewOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const claim = await getClaimById(id);
      setEditClaim(claim);
      setIsEditOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (claim) => {
    setDeleteClaimData(claim);
    setIsDeleteOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold">Claims</h1>

            <p className="text-slate-500 mt-2">
              Total Claims: {totalClaims}
            </p>
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            + Add Claim
          </button>
        </div>

        <ClaimSearch
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />

        {loading ? (
  <div className="bg-white rounded-xl border py-20 text-center">
    Loading...
  </div>
) : (
  <>
    <ClaimTable
      claims={claims}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />

    <ClaimPagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  </>
)}

        <ClaimModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          refreshClaims={refreshClaims}
        />

        <ClaimModal
          isOpen={isEditOpen}
          initialData={editClaim}
          refreshClaims={refreshClaims}
          onClose={() => {
            setIsEditOpen(false);
            setEditClaim(null);
          }}
        />

        <ViewClaimModal
          isOpen={isViewOpen}
          claim={selectedClaim}
          onClose={() => {
            setIsViewOpen(false);
            setSelectedClaim(null);
          }}
        />

        <DeleteClaimModal
          isOpen={isDeleteOpen}
          claim={deleteClaimData}
          refreshClaims={refreshClaims}
          onClose={() => {
            setIsDeleteOpen(false);
            setDeleteClaimData(null);
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default Claims;