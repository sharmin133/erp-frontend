import { useState } from "react";
import { DataTable, type Column } from "../../components/common/DataTable";
import { Modal } from "../../components/common/Modal";
import { Button } from "../../components/common/Button";


import { toast } from "react-toastify";

import type { User, UserRole } from "../../types";
import { useAppSelector } from "../../app/hooks";
import { useUpdateUserRole, useUsers } from "./useUsers";
import { ShieldCheck, Pencil } from "lucide-react";
import { CustomSelect } from "../../components/common/CustomSelect";

const roleOptions: UserRole[] = ["employee", "manager", "admin"];

const roleStyles: Record<UserRole, string> = {
  admin: "bg-red-50 text-red-600",
  manager: "bg-emerald-50 text-emerald-700",
  employee: "bg-gray-100 text-gray-600",
};
export default function UsersPage() {
  const { data: users, isLoading } = useUsers();
  const updateRole = useUpdateUserRole();
  const { user: currentUser } = useAppSelector((s) => s.auth);

  // the user currently being edited
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>("employee");

  const openEditModal = (u: User) => {
    setEditingUser(u);
    setSelectedRole(u.role);
  };

  const closeEditModal = () => setEditingUser(null);

  const handleUpdateRole = () => {
    if (!editingUser) return;

    updateRole.mutate(
      { id: editingUser.id, role: selectedRole },
      {
        onSuccess: () => {
          toast.success("Role updated successfully!");
          closeEditModal();
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.message || "Failed to update role",
          );
        },
      },
    );
  };

  const columns: Column<User>[] = [
    {
      header: "Name",
      render: (u) => (
        <span className="font-medium text-gray-800">{u.name}</span>
      ),
    },
    {
      header: "Email",
      render: (u) => <span className="text-gray-600">{u.email}</span>,
    },
    {
      header: "Role",
      render: (u) => (
        <span
          className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium capitalize ${roleStyles[u.role]}`}
        >
          {u.role}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (u) => (
        <button
          type="button"
          onClick={() => openEditModal(u)}
          disabled={u.id === currentUser?.id}
          aria-label="Edit role"
          className="rounded-md border border-gray-200 p-1.5 text-gray-500 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
        >
          <Pencil size={15} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-md">
            <ShieldCheck size={22} />
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            User & Role Management
          </h1>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          New users are assigned the{" "}
          <span className="font-medium text-emerald-700">Employee</span> role by
          default. Update roles whenever necessary.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={users || []}
        isLoading={isLoading}
        rowKey={(u) => u.id}
        emptyMessage="No users found."
      />

      <Modal
        isOpen={!!editingUser}
        onClose={closeEditModal}
        title="Edit User Role"
      >
        {editingUser && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={editingUser.name}
                disabled
                className="w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={editingUser.email}
                disabled
                className="w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Role
              </label>
              <CustomSelect
                value={selectedRole}
                onChange={(val) => setSelectedRole(val as UserRole)}
                options={roleOptions.map((role) => ({
                  label: role.charAt(0).toUpperCase() + role.slice(1),
                  value: role,
                }))}
                className="w-full"
              />
            </div>

            <Button
              className="w-full"
              disabled={updateRole.isPending}
              onClick={handleUpdateRole}
            >
              {updateRole.isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}