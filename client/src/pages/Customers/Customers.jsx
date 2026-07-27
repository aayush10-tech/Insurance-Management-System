import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import CustomerTable from "../../components/customers/CustomerTable";
import CustomerSearch from "../../components/customers/CustomerSearch";
import CustomerPagination from "../../components/customers/CustomerPagination";
import CustomerModal from "../../components/customers/CustomerModal";
import ViewCustomerModal from "../../components/customers/ViewCustomerModal";
import DeleteCustomerModal from "../../components/customers/DeleteCustomerModal";

import useCustomers from "../../hooks/useCustomers";
import { getCustomerById } from "../../services/customerService";

const Customers = () => {
  const {
    customers,
    loading,
    totalCustomers,
    search,
    setSearch,
    page,
    totalPages,
    setPage,
    refreshCustomers,
  } = useCustomers();

  // Add Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // View Modal
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Edit Modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);

  // Delete Modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteCustomerData, setDeleteCustomerData] = useState(null);

  // View Customer
  const handleView = async (id) => {
    try {
      const customer = await getCustomerById(id);

      setSelectedCustomer(customer);
      setIsViewOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Edit Customer
  const handleEdit = async (id) => {
    try {
      const customer = await getCustomerById(id);

      setEditCustomer(customer);
      setIsEditOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Customer
  const handleDelete = (customer) => {
    setDeleteCustomerData(customer);
    setIsDeleteOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <div>
            <h1 className="text-4xl font-bold">
              Customers
            </h1>

            <p className="text-slate-500 mt-2">
              Total Customers: {totalCustomers}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            + Add Customer
          </button>

        </div>

        {/* Search */}
        <CustomerSearch
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />

        {/* Customer Table */}
        {loading ? (
          <div className="bg-white rounded-xl border py-20 text-center">
            Loading...
          </div>
        ) : (
          <>
            <CustomerTable
              customers={customers}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <CustomerPagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}

        {/* Add Customer */}
        <CustomerModal
          isOpen={isModalOpen}
          mode="add"
          onSuccess={refreshCustomers}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Edit Customer */}
        <CustomerModal
          isOpen={isEditOpen}
          mode="edit"
          customer={editCustomer}
          onSuccess={refreshCustomers}
          onClose={() => {
            setIsEditOpen(false);
            setEditCustomer(null);
          }}
        />

        {/* View Customer */}
        <ViewCustomerModal
          isOpen={isViewOpen}
          customer={selectedCustomer}
          onClose={() => {
            setIsViewOpen(false);
            setSelectedCustomer(null);
          }}
        />

        {/* Delete Customer */}
        <DeleteCustomerModal
          isOpen={isDeleteOpen}
          customer={deleteCustomerData}
          onSuccess={refreshCustomers}
          onClose={() => {
            setIsDeleteOpen(false);
            setDeleteCustomerData(null);
          }}
        />

      </div>
    </DashboardLayout>
  );
};

export default Customers;