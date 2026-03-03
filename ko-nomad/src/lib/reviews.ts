import type { Review } from "@/types/city";
import { reviews as seedReviews } from "@/data/reviews";

const STORAGE_KEY = "konomad-reviews";
const HELPFUL_KEY = "konomad-helpful-votes";

function getStoredReviews(): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveReviews(reviews: Review[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

export function getReviews(citySlug: string): Review[] {
  const stored = getStoredReviews();
  const citySeeds = seedReviews.filter((r) => r.citySlug === citySlug);
  const cityStored = stored.filter((r) => r.citySlug === citySlug);
  return [...citySeeds, ...cityStored];
}

export function addReview(review: Review): void {
  const stored = getStoredReviews();
  stored.push(review);
  saveReviews(stored);
}

export function getHelpfulVotes(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const data = localStorage.getItem(HELPFUL_KEY);
    return data ? new Set(JSON.parse(data)) : new Set();
  } catch {
    return new Set();
  }
}

function saveHelpfulVotes(votes: Set<string>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(HELPFUL_KEY, JSON.stringify([...votes]));
}

export function toggleHelpful(reviewId: string): { voted: boolean } {
  const votes = getHelpfulVotes();
  const isVoted = votes.has(reviewId);

  if (isVoted) {
    votes.delete(reviewId);
  } else {
    votes.add(reviewId);
  }

  saveHelpfulVotes(votes);

  const stored = getStoredReviews();
  const idx = stored.findIndex((r) => r.id === reviewId);
  if (idx !== -1) {
    stored[idx].helpful += isVoted ? -1 : 1;
    saveReviews(stored);
  }

  return { voted: !isVoted };
}

export function getHelpfulCount(review: Review): number {
  const stored = getStoredReviews();
  const found = stored.find((r) => r.id === review.id);
  if (found) return found.helpful;
  return review.helpful;
}
