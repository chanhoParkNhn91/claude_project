import { notFound } from "next/navigation";
import { cities } from "@/data/cities";
import { reviews } from "@/data/reviews";
import CityHero from "@/components/city/CityHero";
import CityDetailTabs from "@/components/city/CityDetailTabs";
import type { Metadata } from "next";

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({
    slug: city.slug,
  }));
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = cities.find((c) => c.slug === slug);

  if (!city) {
    return { title: "도시를 찾을 수 없습니다" };
  }

  return {
    title: `${city.name} - 노마드 점수 ${city.nomadScore} | Ko Nomad`,
    description: city.description,
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = cities.find((c) => c.slug === slug);

  if (!city) {
    notFound();
  }

  const cityReviews = reviews.filter((r) => r.citySlug === slug);

  return (
    <div className="min-h-screen bg-background">
      <CityHero city={city} />
      <main className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        <CityDetailTabs city={city} reviews={cityReviews} />
      </main>
    </div>
  );
}
