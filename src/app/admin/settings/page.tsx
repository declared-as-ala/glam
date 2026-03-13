import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { SettingsForm } from "@/components/admin/settings-form";
import { getSiteSettings } from "@/lib/queries";

export default async function AdminSettingsPage() {
  const settings = (await getSiteSettings()) as any;

  return (
    <div>
      <AdminPageHeader title="Settings" description="Coordonnees, newsletter et textes globaux du site." />
      <SettingsForm initialData={settings} />
    </div>
  );
}
