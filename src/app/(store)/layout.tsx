import { AnnouncementBar } from "@/components/storefront/announcement-bar";
import { CartDrawer } from "@/components/storefront/cart-drawer";
import { SiteFooter } from "@/components/storefront/site-footer";
import { SiteHeader } from "@/components/storefront/site-header";
import { getStoreNavigationData } from "@/lib/queries";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { categories, brands, settings } = (await getStoreNavigationData()) as any;

  return (
    <>
      <AnnouncementBar
        text={settings?.announcementBarText}
        whatsappLabel={settings?.whatsappLabel}
        phone={settings?.phone}
      />
      <SiteHeader categories={categories} brands={brands} />
      <main>{children}</main>
      <SiteFooter categories={categories} settings={settings} />
      <CartDrawer />
    </>
  );
}
