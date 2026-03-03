"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { getCity, getWorkSpacesByCity } from "@/lib/api";
import CityHero from "@/components/city/CityHero";
import CityDetailTabs from "@/components/city/CityDetailTabs";
import CityWorkSpaces from "@/components/spaces/CityWorkSpaces";
import type { CityData } from "@/types/city";
import type { WorkSpace } from "@/data/spaces";

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export default function CityPage({ params }: CityPageProps) {
  const { slug } = use(params);
  const [city, setCity] = useState<CityData | null>(null);
  const [spaces, setSpaces] = useState<WorkSpace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const [cityData, spacesData] = await Promise.all([
          getCity(slug),
          getWorkSpacesByCity(slug).catch(() => [] as WorkSpace[]),
        ]);

        if (!cancelled) {
          setCity(cityData);
          setSpaces(
            (spacesData as WorkSpace[])
              .sort((a: WorkSpace, b: WorkSpace) => b.rating - a.rating)
              .slice(0, 3)
          );
        }
      } catch {
        if (!cancelled) {
          setError("도시 정보를 불러올 수 없습니다.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-64 animate-pulse bg-muted" />
        <main className="mx-auto max-w-4xl px-4 py-8 md:px-8">
          <div className="space-y-4">
            <div className="h-10 w-64 animate-pulse rounded bg-muted" />
            <div className="h-6 w-full animate-pulse rounded bg-muted" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
            <div className="mt-8 h-64 animate-pulse rounded-xl bg-muted" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <h1 className="text-2xl font-bold text-foreground">
          {error ?? "도시를 찾을 수 없습니다"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          요청하신 도시 정보가 존재하지 않습니다.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CityHero city={city} />
      <main className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        <CityDetailTabs city={city} citySlug={slug} />

        {/* 이 도시의 작업 공간 */}
        {spaces.length > 0 && (
          <CityWorkSpaces
            cityName={city.name}
            citySlug={city.slug}
            spaces={spaces}
          />
        )}
      </main>
    </div>
  );
}
