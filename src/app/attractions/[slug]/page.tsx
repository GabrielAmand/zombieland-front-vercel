import { notFound } from "next/navigation";
import AttractionDetails from "@/components/attraction/AttractionDetails";
import CarouselReviews from "@/components/attractionReview/CarouselReviews";
import { getApiUrl } from "@/utils/getApi";
import { Suspense } from "react";

export default async function AttractionPage({
  params,
}: {
  params: { slug: string };
}) {
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