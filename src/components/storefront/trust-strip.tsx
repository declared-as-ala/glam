import { Lock, MessageCircle, Package, Truck } from "lucide-react";

const iconMap = {
  truck: Truck,
  lock: Lock,
  message: MessageCircle,
  package: Package,
};

export function TrustStrip({
  items,
}: {
  items?: Array<{ title?: string; description?: string; icon?: string }>;
}) {
  const fallback = [
    { title: "Livraison Rapide", description: "Gratuite a partir de 200 TND", icon: "truck" },
    { title: "Paiement Securise", description: "100% securise et crypte", icon: "lock" },
    { title: "Support WhatsApp", description: "Assistance 7j/7", icon: "message" },
    { title: "Produits Authentiques", description: "Garantie d'authenticite", icon: "package" },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {(items?.length ? items : fallback).map((item) => {
        const Icon = iconMap[(item.icon as keyof typeof iconMap) ?? "package"] ?? Package;
        return (
          <div
            key={`${item.title}-${item.description}`}
            className="rounded-[1.5rem] bg-white p-6 text-center shadow-sm ring-1 ring-gray-100"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#3AB7A5]/10">
              <Icon className="h-8 w-8 text-[#3AB7A5]" />
            </div>
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}
