import React, { useState } from "react";
import UserRow from "./userRow";
import CreateUserModal from "../modals/createUserModal";
import EditUserModal from "../modals/editUserModal";
import DeleteUserModal from "../modals/deleteUserModal";

const Users = ({ users }) => {
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const filteredUsers = (users || []).filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-5 flex flex-col h-full max-w-full">
      {/* Header & Create Button */}
      <div className="bg-white shadow-lg mb-7 rounded-3xl p-6 flex justify-between items-center border border-gray-50">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Users</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            {filteredUsers.length} users registered
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-3 rounded-full font-bold   transition-all  border border-gray-100 shadow-sm"
        >
          New User
        </button>
      </div>

      {/* Table Container */}
      <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md h-12 bg-gray-50 border border-slate-200 rounded-xl px-4 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/5"
          />
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px] flex flex-col gap-2">
            {/* Table Headers */}
            <div className="flex flex-row p-4 font-black text-gray-400 text-[11px] uppercase tracking-[0.15em] border-b border-gray-50 mb-2">
              <div className="w-16 shrink-0 px-2">ID</div>
              <div className="flex-1 px-2">Username</div>
              <div className="w-40 shrink-0 px-2">Role</div>
              <div className="w-48 shrink-0 px-2 text-right">Created Date</div>
              <div className="w-32 shrink-0 text-center px-2">Actions</div>
            </div>

            {!filteredUsers.length ? (
              <div className="h-32 flex items-center justify-center text-gray-400 italic bg-gray-50 rounded-2xl">
                No users found.
              </div>
            ) : (
              filteredUsers.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onEdit={() => handleEditUser(user)}
                  onDelete={() => handleDeleteUser(user)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateUserModal onClose={() => setIsCreateModalOpen(false)} />
      )}

      {isEditOpen && selectedUser && (
        <EditUserModal
          userToEdit={selectedUser}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedUser(null);
          }}
        />
      )}

      {isDeleteOpen && selectedUser && (
        <DeleteUserModal
          userToDelete={selectedUser}
          onCancel={() => {
            setIsDeleteOpen(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default Users;
