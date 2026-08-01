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
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    try {
      const claim = await getClaimById(id);
      setEditClaim(claim);
      setIsEditOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (claim) => {
    setDeleteClaimData(claim);
    setIsDeleteOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900">
              Claims
            </h1>

            <p className="mt-2 text-slate-500 text-lg">
              Total Claims :
              <span className="ml-2 font-semibold text-slate-700">
                {totalClaims}
              </span>
            </p>
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700 transition"
          >
            + Add Claim
          </button>

        </div>

        {/* Search */}

        <ClaimSearch
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />

        {/* Table */}

        {loading ? (
          <div className="rounded-2xl border bg-white py-20 text-center text-slate-500 shadow-sm">
            Loading Claims...
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

        {/* Add */}

        <ClaimModal
          isOpen={isAddOpen}
          refreshClaims={refreshClaims}
          onClose={() => setIsAddOpen(false)}
        />

        {/* Edit */}

        <ClaimModal
          isOpen={isEditOpen}
          initialData={editClaim}
          refreshClaims={refreshClaims}
          onClose={() => {
            setEditClaim(null);
            setIsEditOpen(false);
          }}
        />

        {/* View */}

        <ViewClaimModal
          isOpen={isViewOpen}
          claim={selectedClaim}
          onClose={() => {
            setSelectedClaim(null);
            setIsViewOpen(false);
          }}
        />

        {/* Delete */}

        <DeleteClaimModal
          isOpen={isDeleteOpen}
          claim={deleteClaimData}
          refreshClaims={refreshClaims}
          onClose={() => {
            setDeleteClaimData(null);
            setIsDeleteOpen(false);
          }}
        />

      </div>
    </DashboardLayout>
  );
};

export default Claims;