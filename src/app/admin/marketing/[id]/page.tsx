import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MarketingCampaignForm } from "@/components/admin/marketing-campaign-form";
import { getCampaignById } from "@/lib/queries";

export default async function AdminEditMarketingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = (await getCampaignById(id)) as any;
  if (!campaign) notFound();

  return (
    <div>
      <AdminPageHeader title="Editer campagne" description={campaign.title} />
      <MarketingCampaignForm initialData={campaign} />
    </div>
  );
}
