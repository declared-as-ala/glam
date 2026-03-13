import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { UserBlockButton } from "@/components/admin/user-block-button";
import { getAdminCollections } from "@/lib/queries";
import { formatPrice } from "@/lib/utils";

export default async function AdminUsersPage() {
  const { users } = await getAdminCollections();

  return (
    <div>
      <AdminPageHeader title="Users" description="Profils clients, role, depenses et blocage." />
      <AdminTable headers={["Nom", "Email", "Role", "Depense", "Actions"]}>
        {users.map((user: any) => (
          <tr key={user._id}>
            <td className="px-6 py-4">{user.name}</td>
            <td className="px-6 py-4">{user.email}</td>
            <td className="px-6 py-4">{user.role}</td>
            <td className="px-6 py-4">{formatPrice(user.totalSpent ?? 0)}</td>
            <td className="px-6 py-4">
              <UserBlockButton userId={user._id} isBlocked={Boolean(user.isBlocked)} />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
