import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CityData } from "@/types/city";

const REGION_GRADIENT: Record<string, string> = {
  제주: "from-blue-500 to-cyan-400",
  경상: "from-orange-500 to-amber-400",
  강원: "from-emerald-500 to-teal-400",
  수도권: "from-violet-500 to-purple-400",
  전라: "from-green-500 to-lime-400",
  충청: "from-sky-500 to-indigo-400",
};

interface CityHeroProps {
  city: CityData;
}

export default function CityHero({ city }: CityHeroProps) {
  const gradient =
    REGION_GRADIENT[city.regionGroup] ?? "from-gray-500 to-gray-400";

  return (
    <section
      className={`bg-gradient-to-br ${gradient} relative overflow-hidden px-4 py-12 text-white md:px-8 md:py-16`}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-white/80">
          <Link href="/" className="hover:text-white transition-colors">
            홈
          </Link>
          <span>/</span>
          <span>{city.regionGroup}</span>
          <span>/</span>
          <span className="text-white font-medium">{city.name}</span>
        </nav>

        {/* City info */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">{city.name}</h1>
            <p className="mt-1 text-lg text-white/80">{city.region}</p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/90">
              {city.description}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30 text-base px-3 py-1"
              >
                {city.nomadScore.toFixed(1)}
              </Badge>
              <span className="text-sm text-white/80">
                리뷰 {city.reviewCount.toLocaleString()}개
              </span>
            </div>
            <Button
              variant="secondary"
              className="bg-white/20 text-white hover:bg-white/30 border border-white/30"
            >
              리뷰 작성하기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
