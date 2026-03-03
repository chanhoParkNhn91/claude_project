import Link from "next/link";
import { Button } from "@/components/ui/button";
import SpaceCard from "@/components/spaces/SpaceCard";
import type { WorkSpace } from "@/data/spaces";

interface CityWorkSpacesProps {
  cityName: string;
  citySlug: string;
  spaces: WorkSpace[];
}

export default function CityWorkSpaces({
  cityName,
  citySlug,
  spaces,
}: CityWorkSpacesProps) {
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
