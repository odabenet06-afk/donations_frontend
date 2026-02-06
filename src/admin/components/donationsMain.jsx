import React, { useState } from "react";
import useAdminStore from "../services/store/adminStore";
import fetchDonations from "../services/functions/fetchDonations";
import DonationFilter from "./donationFilter";
import DonationRow from "./donationRow";
import ConfirmVoidModal from "../modals/confirmVoidModal";
import CreateDonationModal from "../modals/createDonatioModal";
import EditDonationModal from "../modals/editDonationModal";

const Donations = ({ donations }) => {
  const { setDonations, language } = useAdminStore();
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [search, setSearch] = useState("");
  const [toggleYear, setToggleYear] = useState(false);
  const [toggleMonth, setToggleMonth] = useState(false);

  const [voidModal, setVoidModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [createModal, setCreateModal] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [currentDonation, setCurrentDonation] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dict = {
    en: {
      metrics: "Donation Metrics",
      transactions: "transactions",
      newDonation: "+ New Donation",
      totalDonations: "Total Donations",
      donorId: "Donor ID",
      donorName: "Donor Name",
      amount: "Amount",
      purpose: "Purpose",
      receipt: "Receipt",
      admin: "Admin",
      date: "Date",
      action: "Action",
      noDonations: "No donations found for this selection.",
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    sq: {
      metrics: "Metrikat e Donacioneve",
      transactions: "transaksione",
      newDonation: "+ Donacion i Ri",
      totalDonations: "Totali i Donacioneve",
      donorId: "ID e Donatorit",
      donorName: "Emri i Donatorit",
      amount: "Shuma",
      purpose: "Qëllimi",
      receipt: "Dëshmia",
      admin: "Admin",
      date: "Data",
      action: "Veprim",
      noDonations: "Nuk u gjet asnjë donacion për këtë përzgjedhje.",
      monthNames: ["Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"]
    },
    mk: {
      metrics: "Метрики за донации",
      transactions: "трансакции",
      newDonation: "+ Нова донација",
      totalDonations: "Вкупно донации",
      donorId: "ID на донатор",
      donorName: "Име на донатор",
      amount: "Износ",
      purpose: "Цел",
      receipt: "Потврда",
      admin: "Админ",
      date: "Датум",
      action: "Акција",
      noDonations: "Не се пронајдени донации за овој избор.",
      monthNames: ["Јануари", "Февруари", "Март", "Април", "Мај", "Јуни", "Јули", "Август", "Септември", "Октомври", "Ноември", "Декември"]
    }
  };

  const lang = dict[language] || dict.en;

  const months = lang.monthNames.map((name, index) => ({
    label: name,
    value: index + 1
  }));

  const openVoidModal = (id) => {
    setSelectedId(id);
    setVoidModal(true);
  };

  const openEditModal = (donation) => {
    setCurrentDonation(donation);
    setEditModal(true);
  };

  const handleSearch = async () => {
    const result = await fetchDonations(year, month, search);
    setDonations(result.data || []);
    setCurrentPage(1);
  };

  const currentDonations = (donations || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalSum = (donations || [])
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0)
    .toFixed(2);

  return (
    <div className="p-5 flex flex-col h-full max-w-full">
      {/* Header Summary Card */}
      <div className="bg-white shadow-lg mb-7 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-50">
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold text-slate-800">{lang.metrics}</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            {donations?.length || 0} {lang.transactions}
          </p>
        </div>

        <div className="flex-1 flex justify-center">
          <button
            onClick={() => setCreateModal(true)}
            className="bg-white text-slate-600 font-semibold px-8 py-2.5 rounded-full shadow-sm hover:bg-gray-50 transition border border-gray-100 active:scale-95 whitespace-nowrap"
          >
            {lang.newDonation}
          </button>
        </div>

        <div className="text-center md:text-right">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {lang.totalDonations}
          </p>
          <p className="text-2xl font-black">
            {totalSum} <span className="text-sm text-gray-400">MKD</span>
          </p>
        </div>
      </div>

      <DonationFilter
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

      {/* Table Section */}
      <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6">
        <div className="w-full overflow-x-auto pb-4">
          <div className="min-w-[1250px] flex flex-col gap-2">
            <div className="flex flex-row p-4 font-black text-gray-400 text-[11px] uppercase tracking-[0.15em] border-b border-gray-50 mb-2">
              <div className="w-32 shrink-0 px-2">{lang.donorId}</div>
              <div className="w-48 shrink-0 px-2">{lang.donorName}</div>
              <div className="w-40 shrink-0 px-2">{lang.amount}</div>
              <div className="w-44 shrink-0 px-2">{lang.purpose}</div>
              <div className="w-32 shrink-0 px-2">{lang.receipt}</div>
              <div className="flex-1 px-4">{lang.admin}</div>
              <div className="w-40 shrink-0 text-right px-2">{lang.date}</div>
              <div className="w-20 shrink-0 text-center px-2">{lang.action}</div>
            </div>

            {!currentDonations.length ? (
              <div className="h-32 flex items-center justify-center text-gray-400 italic bg-gray-50 rounded-2xl">
                {lang.noDonations}
              </div>
            ) : (
              currentDonations.map((donation) => (
                <DonationRow
                  key={donation.id}
                  donation={donation}
                  onDelete={openVoidModal}
                  onEdit={openEditModal}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {voidModal && (
        <ConfirmVoidModal
          type="donation"
          id={selectedId}
          onCancel={() => setVoidModal(false)}
        />
      )}

      {createModal && (
        <CreateDonationModal onClose={() => setCreateModal(false)} />
      )}

      {editModal && (
        <EditDonationModal
          donation={currentDonation}
          onClose={() => setEditModal(false)}
        />
      )}
    </div>
  );
};

export default Donations;