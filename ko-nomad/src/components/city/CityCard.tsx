import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CityData } from "@/types/city";

const GRADIENT_MAP: Record<string, string> = {
  jeju: "from-[#FF6B6B] to-[#FF8E53]",
  "busan-haeundae": "from-[#4FACFE] to-[#00F2FE]",
  gangneung: "from-[#43E97B] to-[#38F9D7]",
  "seoul-seongsu": "from-[#FA709A] to-[#FEE140]",
  jeonju: "from-[#A18CD1] to-[#FBC2EB]",
  daejeon: "from-[#667EEA] to-[#764BA2]",
  sokcho: "from-[#6DD5FA] to-[#2980B9]",
  yeosu: "from-[#F093FB] to-[#F5576C]",
  chuncheon: "from-[#4DC9F6] to-[#9B59B6]",
  "seoul-hongdae": "from-[#FF9A9E] to-[#FAD0C4]",
  gyeongju: "from-[#C9D6FF] to-[#E2E2E2]",
  sejong: "from-[#84FAB0] to-[#8FD3F4]",
  gwangju: "from-[#FFD86F] to-[#FC6262]",
  aewol: "from-[#FDC830] to-[#F37335]",
  pangyo: "from-[#0072ff] to-[#00c6ff]",
};

const DEFAULT_GRADIENT = "from-[#a8edea] to-[#fed6e3]";

function formatMonthlyCost(cost: number): string {
  return `${Math.round(cost / 10000)}`;
}

interface CityCardProps {
  city: CityData;
  rank: number;
}

export default function CityCard({ city, rank }: CityCardProps) {
  const gradient = GRADIENT_MAP[city.slug] ?? DEFAULT_GRADIENT;

  return (
    <Link href={`/city/${city.slug}`} className="group block">
      <Card className="gap-0 overflow-hidden border p-0 transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div
          className={`relative flex h-36 items-end bg-gradient-to-br ${gradient} p-4`}
        >
          <Badge className="absolute left-3 top-3 bg-black/50 text-white hover:bg-black/50">
            #{rank}
          </Badge>
          <Badge className="absolute right-3 top-3 bg-white/90 text-gray-800 hover:bg-white/90">
            {city.internetSpeed} Mbps
          </Badge>
        </div>

        <div className="px-4 pt-4 pb-3">
          <h3 className="text-lg font-bold text-foreground">{city.name}</h3>
          <p className="text-sm text-muted-foreground">{city.region}</p>
        </div>

        <div className="flex items-center justify-between border-t px-4 py-3">
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            {city.weatherIcon} {city.temperature}&deg;C
          </span>
          <span className="text-sm font-semibold text-foreground">
            ₩{formatMonthlyCost(city.monthlyCost)}만
            <span className="font-normal text-muted-foreground">/월</span>
          </span>
        </div>

        <div className="flex items-center justify-between border-t px-4 py-3">
          <span className="flex items-center gap-1 text-sm">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold">{city.nomadScore}</span>
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            👍 {city.likePercent}%
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            ☕ {city.cafeCount}
          </span>
        </div>
      </Card>
    </Link>
  );
}
