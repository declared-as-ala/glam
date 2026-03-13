import { redirect } from "next/navigation";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#f7faf9]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}
