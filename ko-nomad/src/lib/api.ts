import type { CityData, Review } from "@/types/city";
import type { WorkSpace } from "@/data/spaces";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// 토큰 관리
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("konomad-token");
}

export function setToken(token: string): void {
  localStorage.setItem("konomad-token", token);
}

export function removeToken(): void {
  localStorage.removeItem("konomad-token");
}

// fetch 래퍼
async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "요청 실패" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

// Auth API
export async function login(
  email: string,
  password: string
): Promise<{ token: string; user: AuthUser }> {
  return fetchApi("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signup(
  email: string,
  password: string,
  name: string
): Promise<{ token: string; user: AuthUser }> {
  return fetchApi("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
}

export async function getMe(): Promise<AuthUser> {
  return fetchApi("/api/auth/me");
}

// Cities API
export async function getCities(params?: {
  region?: string;
  environment?: string;
  sort?: string;
  search?: string;
}): Promise<{ cities: CityData[] }> {
  const searchParams = new URLSearchParams();
  if (params?.region) searchParams.set("region", params.region);
  if (params?.environment) searchParams.set("environment", params.environment);
  if (params?.sort) searchParams.set("sort", params.sort);
  if (params?.search) searchParams.set("search", params.search);

  const query = searchParams.toString();
  return fetchApi(`/api/cities${query ? `?${query}` : ""}`);
}

export async function getCity(slug: string): Promise<CityData> {
  return fetchApi(`/api/cities/${slug}`);
}

// Reviews API
export async function getReviews(
  citySlug: string,
  sort?: string
): Promise<Review[]> {
  const query = sort ? `?sort=${sort}` : "";
  return fetchApi(`/api/cities/${citySlug}/reviews${query}`);
}

export async function createReview(
  data: CreateReviewRequest
): Promise<Review> {
  return fetchApi("/api/reviews", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function toggleHelpful(
  reviewId: number
): Promise<{ helpful: number; voted: boolean }> {
  return fetchApi(`/api/reviews/${reviewId}/helpful`, {
    method: "POST",
  });
}

export async function getMyReviews(): Promise<Review[]> {
  return fetchApi("/api/reviews/my");
}

// WorkSpaces API
export async function getWorkSpaces(params?: {
  citySlug?: string;
  type?: string;
  sort?: string;
}): Promise<WorkSpace[]> {
  const searchParams = new URLSearchParams();
  if (params?.citySlug) searchParams.set("citySlug", params.citySlug);
  if (params?.type) searchParams.set("type", params.type);
  if (params?.sort) searchParams.set("sort", params.sort);

  const query = searchParams.toString();
  return fetchApi(`/api/workspaces${query ? `?${query}` : ""}`);
}

export async function getWorkSpacesByCity(
  citySlug: string
): Promise<WorkSpace[]> {
  return fetchApi(`/api/cities/${citySlug}/workspaces`);
}

// Types
export interface AuthUser {
  id: number;
  email: string;
  name: string;
  profileImage: string;
  jobType: string;
}

interface CreateReviewRequest {
  citySlug: string;
  content?: string;
  pros?: string;
  cons?: string;
  scores?: Record<string, number>;
  [key: string]: unknown;
}
