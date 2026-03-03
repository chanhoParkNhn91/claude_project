"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  hasError?: boolean;
}

export default function StarRating({ value, onChange, hasError }: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  const displayValue = hoverValue || value;

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex gap-0.5 rounded-md p-1",
          hasError && "ring-2 ring-destructive"
        )}
        onMouseLeave={() => setHoverValue(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={cn(
              "text-xl transition-colors cursor-pointer",
              star <= displayValue
                ? "text-yellow-400"
                : "text-muted-foreground/30"
            )}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverValue(star)}
          >
            ★
          </button>
        ))}
      </div>
      <span className="text-sm text-muted-foreground tabular-nums">
        {value > 0 ? `${value}/5` : "0/5"}
      </span>
    </div>
  );
}
