import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MarketingCampaignForm } from "@/components/admin/marketing-campaign-form";

export default function AdminNewMarketingPage() {
  return (
    <div>
      <AdminPageHeader title="Nouvelle campagne" />
      <MarketingCampaignForm />
    </div>
  );
}
