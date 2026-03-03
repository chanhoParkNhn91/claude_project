"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { addReview } from "@/lib/reviews";
import StarRating from "@/components/review/StarRating";
import type { Review } from "@/types/city";

interface ReviewFormProps {
  citySlug: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReviewAdded: () => void;
}

const STAY_DURATIONS: Review["stayDuration"][] = [
  "1주 미만",
  "1~4주",
  "1~3개월",
  "3개월+",
];

const STAY_PURPOSES: Review["stayPurpose"][] = [
  "원격근무",
  "프리랜서",
  "워케이션",
  "기타",
];

const SCORE_CATEGORIES = [
  { key: "cafeWork" as const, emoji: "☕", label: "카페 작업 환경" },
  { key: "internet" as const, emoji: "📶", label: "인터넷 속도" },
  { key: "cost" as const, emoji: "💰", label: "생활비 만족도" },
  { key: "transport" as const, emoji: "🚌", label: "교통 편의성" },
  { key: "housing" as const, emoji: "🏠", label: "주거 환경" },
  { key: "nature" as const, emoji: "🌊", label: "자연/환경" },
  { key: "safety" as const, emoji: "🔒", label: "안전/치안" },
  { key: "community" as const, emoji: "👥", label: "커뮤니티" },
];

const YEARS = ["2024", "2025", "2026"];
const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1));

interface FormErrors {
  nickname?: string;
  stayDuration?: string;
  stayPurpose?: string;
  visitYear?: string;
  visitMonth?: string;
  scores?: Partial<Record<keyof Review["scores"], string>>;
  pros?: string;
  cons?: string;
}

export default function ReviewForm({
  citySlug,
  open,
  onOpenChange,
  onReviewAdded,
}: ReviewFormProps) {
  const [nickname, setNickname] = useState("");
  const [stayDuration, setStayDuration] = useState<Review["stayDuration"] | "">("");
  const [stayPurpose, setStayPurpose] = useState<Review["stayPurpose"] | "">("");
  const [visitYear, setVisitYear] = useState("");
  const [visitMonth, setVisitMonth] = useState("");
  const [scores, setScores] = useState<Review["scores"]>({
    cafeWork: 0,
    internet: 0,
    cost: 0,
    transport: 0,
    housing: 0,
    nature: 0,
    safety: 0,
    community: 0,
  });
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const averageScore = useCallback(() => {
    const values = Object.values(scores);
    const filled = values.filter((v) => v > 0);
    if (filled.length === 0) return 0;
    return Math.round((filled.reduce((a, b) => a + b, 0) / filled.length) * 10) / 10;
  }, [scores]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!nickname.trim()) {
      newErrors.nickname = "닉네임을 입력해주세요";
    }

    if (!stayDuration) {
      newErrors.stayDuration = "체류 기간을 선택해주세요";
    }

    if (!stayPurpose) {
      newErrors.stayPurpose = "체류 목적을 선택해주세요";
    }

    if (!visitYear) {
      newErrors.visitYear = "방문 연도를 선택해주세요";
    }

    if (!visitMonth) {
      newErrors.visitMonth = "방문 월을 선택해주세요";
    }

    const scoreErrors: Partial<Record<keyof Review["scores"], string>> = {};
    for (const category of SCORE_CATEGORIES) {
      if (scores[category.key] < 1) {
        scoreErrors[category.key] = `${category.label} 점수를 선택해주세요`;
      }
    }
    if (Object.keys(scoreErrors).length > 0) {
      newErrors.scores = scoreErrors;
    }

    if (pros.trim().length < 20) {
      newErrors.pros = "장점을 20자 이상 작성해주세요";
    }

    if (cons.trim().length < 20) {
      newErrors.cons = "단점을 20자 이상 작성해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const review: Review = {
      id: `user-${Date.now()}`,
      citySlug,
      userName: nickname.trim(),
      userImage: "",
      stayDuration: stayDuration as Review["stayDuration"],
      stayPurpose: stayPurpose as Review["stayPurpose"],
      visitDate: `${visitYear}-${visitMonth.padStart(2, "0")}`,
      scores,
      pros: pros.trim(),
      cons: cons.trim(),
      totalScore: averageScore(),
      helpful: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    addReview(review);
    onReviewAdded();
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setNickname("");
    setStayDuration("");
    setStayPurpose("");
    setVisitYear("");
    setVisitMonth("");
    setScores({
      cafeWork: 0,
      internet: 0,
      cost: 0,
      transport: 0,
      housing: 0,
      nature: 0,
      safety: 0,
      community: 0,
    });
    setPros("");
    setCons("");
    setErrors({});
  };

  const handleScoreChange = (key: keyof Review["scores"], value: number) => {
    setScores((prev) => ({ ...prev, [key]: value }));
    if (errors.scores?.[key]) {
      setErrors((prev) => {
        const newScoreErrors = { ...prev.scores };
        delete newScoreErrors[key];
        if (Object.keys(newScoreErrors).length === 0) {
          const { scores: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, scores: newScoreErrors };
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>리뷰 작성하기</DialogTitle>
          <DialogDescription>
            이 도시에 대한 경험을 공유해주세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 닉네임 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              닉네임 <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                if (errors.nickname) {
                  setErrors((prev) => ({ ...prev, nickname: undefined }));
                }
              }}
              className={cn(errors.nickname && "border-destructive")}
            />
            {errors.nickname && (
              <p className="text-xs text-destructive">{errors.nickname}</p>
            )}
          </div>

          {/* 체류 기간 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              체류 기간 <span className="text-destructive">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {STAY_DURATIONS.map((duration) => (
                <Button
                  key={duration}
                  type="button"
                  variant={stayDuration === duration ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setStayDuration(duration);
                    if (errors.stayDuration) {
                      setErrors((prev) => ({ ...prev, stayDuration: undefined }));
                    }
                  }}
                >
                  {duration}
                </Button>
              ))}
            </div>
            {errors.stayDuration && (
              <p className="text-xs text-destructive">{errors.stayDuration}</p>
            )}
          </div>

          {/* 체류 목적 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              체류 목적 <span className="text-destructive">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {STAY_PURPOSES.map((purpose) => (
                <Button
                  key={purpose}
                  type="button"
                  variant={stayPurpose === purpose ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setStayPurpose(purpose);
                    if (errors.stayPurpose) {
                      setErrors((prev) => ({ ...prev, stayPurpose: undefined }));
                    }
                  }}
                >
                  {purpose}
                </Button>
              ))}
            </div>
            {errors.stayPurpose && (
              <p className="text-xs text-destructive">{errors.stayPurpose}</p>
            )}
          </div>

          {/* 방문 시기 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              방문 시기 <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-2">
              <Select
                value={visitYear}
                onValueChange={(val) => {
                  setVisitYear(val);
                  if (errors.visitYear) {
                    setErrors((prev) => ({ ...prev, visitYear: undefined }));
                  }
                }}
              >
                <SelectTrigger
                  className={cn(
                    "w-[120px]",
                    errors.visitYear && "border-destructive"
                  )}
                >
                  <SelectValue placeholder="연도" />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}년
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={visitMonth}
                onValueChange={(val) => {
                  setVisitMonth(val);
                  if (errors.visitMonth) {
                    setErrors((prev) => ({ ...prev, visitMonth: undefined }));
                  }
                }}
              >
                <SelectTrigger
                  className={cn(
                    "w-[100px]",
                    errors.visitMonth && "border-destructive"
                  )}
                >
                  <SelectValue placeholder="월" />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}월
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {(errors.visitYear || errors.visitMonth) && (
              <p className="text-xs text-destructive">
                {errors.visitYear || errors.visitMonth}
              </p>
            )}
          </div>

          {/* 항목별 평가 */}
          <div className="space-y-3">
            <label className="text-sm font-medium">
              항목별 평가 <span className="text-destructive">*</span>
            </label>
            <div className="space-y-2">
              {SCORE_CATEGORIES.map((category) => (
                <div key={category.key} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {category.emoji} {category.label}
                    </span>
                    <StarRating
                      value={scores[category.key]}
                      onChange={(val) => handleScoreChange(category.key, val)}
                      hasError={!!errors.scores?.[category.key]}
                    />
                  </div>
                  {errors.scores?.[category.key] && (
                    <p className="text-xs text-destructive text-right">
                      {errors.scores[category.key]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 종합 점수 */}
          <div className="rounded-lg bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">종합 점수</p>
            <p className="text-3xl font-bold text-primary">
              {averageScore() > 0 ? averageScore().toFixed(1) : "-"}
            </p>
            <p className="text-xs text-muted-foreground">
              항목별 평균 자동 계산
            </p>
          </div>

          {/* 장점 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              장점 <span className="text-destructive">*</span>
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                ({pros.length}/20자 이상)
              </span>
            </label>
            <textarea
              className={cn(
                "flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",
                errors.pros && "border-destructive"
              )}
              placeholder="이 도시의 장점을 20자 이상 작성해주세요"
              value={pros}
              onChange={(e) => {
                setPros(e.target.value);
                if (errors.pros && e.target.value.trim().length >= 20) {
                  setErrors((prev) => ({ ...prev, pros: undefined }));
                }
              }}
            />
            {errors.pros && (
              <p className="text-xs text-destructive">{errors.pros}</p>
            )}
          </div>

          {/* 단점 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              단점 <span className="text-destructive">*</span>
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                ({cons.length}/20자 이상)
              </span>
            </label>
            <textarea
              className={cn(
                "flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",
                errors.cons && "border-destructive"
              )}
              placeholder="이 도시의 단점을 20자 이상 작성해주세요"
              value={cons}
              onChange={(e) => {
                setCons(e.target.value);
                if (errors.cons && e.target.value.trim().length >= 20) {
                  setErrors((prev) => ({ ...prev, cons: undefined }));
                }
              }}
            />
            {errors.cons && (
              <p className="text-xs text-destructive">{errors.cons}</p>
            )}
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
            >
              취소
            </Button>
            <Button type="button" onClick={handleSubmit}>
              리뷰 등록
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
