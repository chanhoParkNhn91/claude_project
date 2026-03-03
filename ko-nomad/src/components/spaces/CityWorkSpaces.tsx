"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getWorkSpacesByCity } from "@/lib/api";
import SpaceCard from "@/components/spaces/SpaceCard";
import type { WorkSpace } from "@/data/spaces";

interface CityWorkSpacesProps {
  cityName: string;
  citySlug: string;
  spaces?: WorkSpace[];
}

export default function CityWorkSpaces({
  cityName,
  citySlug,
  spaces: initialSpaces,
}: CityWorkSpacesProps) {
  const [spaces, setSpaces] = useState<WorkSpace[]>(initialSpaces ?? []);
  const [loading, setLoading] = useState(!initialSpaces);

  useEffect(() => {
    if (initialSpaces) return;

    getWorkSpacesByCity(citySlug)
      .then((data) => {
        const sorted = (data as unknown as WorkSpace[])
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setSpaces(sorted);
      })
      .catch(() => {
        setSpaces([]);
      })
      .finally(() => setLoading(false));
  }, [citySlug, initialSpaces]);

  if (loading) {
    return (
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{cityName}의 작업 공간</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      </section>
    );
  }

  if (spaces.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">{cityName}의 작업 공간</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/spaces?city=${citySlug}`}>더보기</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {spaces.map((space) => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>
    </section>
  );
}
