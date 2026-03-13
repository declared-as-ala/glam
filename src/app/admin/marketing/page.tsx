import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { MarketingSendButton } from "@/components/admin/marketing-send-button";
import { getAdminCollections } from "@/lib/queries";

export default async function AdminMarketingPage() {
  const { campaigns, subscribers } = await getAdminCollections();

  return (
    <div>
      <AdminPageHeader title="Marketing" description={`Gestion des campagnes email. Abonnes newsletter: ${subscribers}.`} actionHref="/admin/marketing/new" actionLabel="Nouvelle campagne" />
      <AdminTable headers={["Titre", "Audience", "Statut", "Actions"]}>
        {campaigns.map((campaign: any) => (
          <tr key={campaign._id}>
            <td className="px-6 py-4">{campaign.title}</td>
            <td className="px-6 py-4">{campaign.audience}</td>
            <td className="px-6 py-4">{campaign.status}</td>
            <td className="px-6 py-4">
              <div className="flex gap-3">
                <Link href={`/admin/marketing/${campaign._id}`} className="text-[#3AB7A5]">Editer</Link>
                <MarketingSendButton campaignId={campaign._id} />
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
