import { PageHero } from "@/components/storefront/page-hero";
import { StoreContainer } from "@/components/storefront/store-container";

const faqs = [
  {
    question: "Quels sont les delais de livraison ?",
    answer: "La livraison est generalement assuree sous 24 a 72 heures selon la zone.",
  },
  {
    question: "Puis-je payer a la livraison ?",
    answer: "Oui, le paiement a la livraison est disponible partout en Tunisie pour la premiere version de la boutique.",
  },
  {
    question: "Comment suivre ma commande ?",
    answer: "Depuis votre espace client, vous pouvez consulter le statut et le detail de chaque commande.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero title="FAQ" description="Les reponses aux questions les plus frequentes sur la commande, la livraison et les retours." />
      <StoreContainer className="py-12">
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">{faq.question}</h2>
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </StoreContainer>
    </>
  );
}
