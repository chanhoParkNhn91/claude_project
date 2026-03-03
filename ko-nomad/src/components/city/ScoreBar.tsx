import { cn } from "@/lib/utils";

interface ScoreBarProps {
  emoji: string;
  label: string;
  score: number;
  extra?: string;
}

const SCORE_CONFIG: Record<
  number,
  { color: string; bg: string; text: string }
> = {
  5: { color: "bg-green-500", bg: "bg-green-100", text: "Excellent" },
  4: { color: "bg-emerald-500", bg: "bg-emerald-100", text: "Great" },
  3: { color: "bg-yellow-500", bg: "bg-yellow-100", text: "Good" },
  2: { color: "bg-orange-500", bg: "bg-orange-100", text: "Okay" },
  1: { color: "bg-red-500", bg: "bg-red-100", text: "Bad" },
};

export default function ScoreBar({ emoji, label, score, extra }: ScoreBarProps) {
  const config = SCORE_CONFIG[score] ?? SCORE_CONFIG[3];
  const widthPercent = (score / 5) * 100;

  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="w-5 text-center text-sm">{emoji}</span>
      <span className="w-24 shrink-0 text-sm text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-1 items-center gap-2">
        <div className={cn("h-2.5 flex-1 rounded-full", config.bg)}>
          <div
            className={cn("h-full rounded-full transition-all", config.color)}
            style={{ width: `${widthPercent}%` }}
          />
        </div>
        <span className="w-20 shrink-0 text-right text-sm font-medium">
          {config.text}
        </span>
        {extra && (
          <span className="shrink-0 text-xs text-muted-foreground">
            {extra}
          </span>
        )}
      </div>
    </div>
  );
}
