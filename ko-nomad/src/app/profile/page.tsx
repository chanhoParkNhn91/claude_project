"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { getMyReviews } from "@/lib/api";
import type { Review } from "@/types/city";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Calendar } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setReviewsLoading(true);
      getMyReviews()
        .then((data) => setReviews(data))
        .catch(() => setReviews([]))
        .finally(() => setReviewsLoading(false));
    }
  }, [user]);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="flex items-center justify-center py-20">
          <div className="size-8 animate-spin rounded-full border-4 border-[#FF6B6B] border-t-transparent" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="flex flex-col items-center gap-6 py-20 text-center">
          <div className="rounded-full bg-muted p-6">
            <Star className="size-12 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">로그인이 필요합니다</h1>
            <p className="mt-2 text-muted-foreground">
              마이페이지를 이용하려면 로그인해주세요.
            </p>
          </div>
          <Button
            onClick={() => setLoginOpen(true)}
            className="bg-[#FF6B6B] text-white hover:bg-[#FF5252]"
          >
            로그인하기
          </Button>
          <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
        </div>
      </main>
    );
  }

  const initials = user.name ? user.name.charAt(0) : "U";

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold">마이페이지</h1>

      {/* 프로필 카드 */}
      <Card className="mb-8 p-6">
        <div className="flex items-center gap-6">
          <Avatar className="size-20">
            {user.profileImage && (
              <AvatarImage src={user.profileImage} alt={user.name} />
            )}
            <AvatarFallback className="bg-[#FF6B6B] text-2xl text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            {user.jobType && (
              <Badge variant="secondary" className="mt-1 w-fit">
                {user.jobType}
              </Badge>
            )}
          </div>
        </div>
      </Card>

      {/* 내 리뷰 섹션 */}
      <section>
        <h2 className="mb-4 text-lg font-bold">내 리뷰</h2>
        {reviewsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="size-6 animate-spin rounded-full border-4 border-[#FF6B6B] border-t-transparent" />
          </div>
        ) : reviews.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              아직 작성한 리뷰가 없습니다.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              도시를 방문하고 리뷰를 남겨보세요!
            </p>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <Card key={review.id} className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="outline">{review.citySlug}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="size-3.5" />
                    {new Date(review.createdAt).toLocaleDateString("ko-KR")}
                  </div>
                </div>
                <div className="mb-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < Math.round(review.totalScore)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">
                    {review.totalScore.toFixed(1)}
                  </span>
                </div>
                {review.pros && (
                  <p className="text-sm text-green-700">
                    <span className="font-medium">장점:</span> {review.pros}
                  </p>
                )}
                {review.cons && (
                  <p className="mt-1 text-sm text-red-600">
                    <span className="font-medium">단점:</span> {review.cons}
                  </p>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
