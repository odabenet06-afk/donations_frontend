import React, { useState } from "react";
import useAdminStore from "../services/store/adminStore";
import fetchDonors from "../services/functions/fetchDonors";
import DonorFilter from "./donorFilter";
import DonorRow from "./donorRow";
import ConfirmDeleteModal from "../modals/deleteModal";
import CreateDonorModal from "../modals/createDonor";
import EditDonorModal from "../modals/editDonor";

const Donors = () => {
  const { donors, setDonors, role } = useAdminStore();
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState(null);
  const [currentDnr, setCurrentDnr] = useState(null);

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [search, setSearch] = useState("");
  const [toggleYear, setToggleYear] = useState(false);
  const [toggleMonth, setToggleMonth] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const months = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

  const handleSearch = async () => {
    const result = await fetchDonors(year, month, search);
    setDonors(result.data || []);
    setCurrentPage(1);
  };

  const getPrivacyLabel = (pref) => pref?.replace(/_/g, " ").toLowerCase();

  const totalPages = donors ? Math.ceil(donors.length / itemsPerPage) : 0;
  const currentDonors = (donors || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="p-5 flex flex-col h-full max-w-full">
      {/* Header Card */}
      <div className="bg-white shadow-lg mb-7 rounded-3xl p-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Donors Management
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Total Donors: {donors?.length || 0}
          </p>
        </div>

        <button
          onClick={() => setCreateModal(true)}
          className="bg-white text-slate-600 font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition border border-gray-100"
        >
          + New Donor
        </button>
      </div>

      <DonorFilter
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        toggleYear={toggleYear}
        setToggleYear={setToggleYear}
        toggleMonth={toggleMonth}
        setToggleMonth={setToggleMonth}
        months={months}
      />

      <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6">
        <div className="overflow-x-auto w-full">
          <div className="min-w-[1250px] flex flex-col gap-2">
            {/* Table Headers */}
            <div className="flex flex-row p-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
              <div className="w-36 shrink-0">Donor ID</div>
              <div className="w-48 shrink-0">Full Name</div>
              <div className="w-56 shrink-0">Email</div>
              <div className="w-36 shrink-0">Phone</div>
              <div className="w-48 shrink-0">Privacy</div>
              <div className="flex-1 px-2">Notes</div>
              <div className="w-32 shrink-0 text-right pr-4">Created At</div>
              <div className="w-24 shrink-0 text-center">Actions</div>
            </div>

            {!currentDonors.length ? (
              <div className="h-32 flex items-center justify-center text-gray-400 italic bg-gray-50 rounded-2xl">
                No donors found.
              </div>
            ) : (
              currentDonors.map((donor) => (
                <DonorRow
                  key={donor.id}
                  donor={donor}
                  getPrivacyLabel={getPrivacyLabel}
                  onEdit={(d) => {
                    setCurrentDnr(d);
                    setEditModal(true);
                  }}
                  onDelete={(id) => {
                    setId(id);
                    setDeleteModal(true);
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-gray-100 rounded-xl disabled:opacity-50 text-sm font-semibold"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-100 rounded-xl disabled:opacity-50 text-sm font-semibold"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {deleteModal && (
        <ConfirmDeleteModal
          type="donor"
          onCancel={() => setDeleteModal(false)}
          id={id}
        />
      )}
      {createModal && (
        <CreateDonorModal onClose={() => setCreateModal(false)} />
      )}
      {editModal && (
        <EditDonorModal
          onClose={() => setEditModal(false)}
          donor={currentDnr}
        />
      )}
    </div>
  );
};

export default Donors;
