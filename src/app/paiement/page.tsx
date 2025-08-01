import PaiementSection from "@/components/paiement/PaiementSection";
import { Suspense } from "react";


export const metadata = {
	title: "Paiement – Zombieland",
	description:
		"Validez votre paiement pour Zombieland et confirmez votre réservation.",
};

export default function PaiementPage() {

  return (
    		<div className="px-4 sm:px-6 md:px-8 py-10 max-w-6xl mx-auto">
      <Suspense  fallback={<p className="text-center mt-6">Chargement...</p>}>
        <PaiementSection />
      </Suspense>
    </div>
  );

}
