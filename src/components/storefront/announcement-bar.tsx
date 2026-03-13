import { MessageCircle, Phone, Truck } from "lucide-react";

import { StoreContainer } from "@/components/storefront/store-container";

export function AnnouncementBar({
  text,
  whatsappLabel,
  phone,
}: {
  text?: string;
  whatsappLabel?: string;
  phone?: string;
}) {
  return (
    <div className="bg-[#3AB7A5] py-2 text-white">
      <StoreContainer className="flex flex-col gap-2 text-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4" />
          <span>{text ?? "Livraison gratuite a partir de 200 TND | Paiement a la livraison disponible"}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            {whatsappLabel ?? "WhatsApp"}
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {phone ?? "+216 70 000 000"}
          </span>
        </div>
      </StoreContainer>
    </div>
  );
}
