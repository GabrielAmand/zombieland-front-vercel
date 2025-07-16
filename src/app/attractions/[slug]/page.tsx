import { notFound } from "next/navigation";
import AttractionDetails from "@/components/attraction/AttractionDetails";
import CarouselReviews from "@/components/attractionReview/CarouselReviews";
import { getApiUrl } from "@/utils/getApi";
import { Suspense } from "react";

// ⚠️ IMPORTANT : ne pas typer directement { params } ici.
// Next.js injecte un type PageProps avec params: Promise<...> à la compilation,
// ce qui cause une erreur si on force un type classique comme { slug: string }.
// Utiliser `any` ici évite un conflit avec le typage interne de Next.js.
export default async function Page({ params }: any) {
  const { slug } = params;

  try {
    const httpResponse = await fetch(`${getApiUrl()}/attractions/slug/${slug}`);

    if (httpResponse.status === 404) {
      notFound();
    }

    if (!httpResponse.ok) {
      throw new Error(`Erreur serveur: ${httpResponse.status}`);
    }

    const data = await httpResponse.json();

    return (
      <>
        <AttractionDetails attraction={data.oneAttraction} />
        <Suspense fallback={<p className="text-center mt-6">Chargement des avis...</p>}>
          <CarouselReviews attractionId={data.oneAttraction.id} />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
