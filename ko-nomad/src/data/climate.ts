export interface MonthlyClimate {
  month: number;
  avgTemp: number;
  minTemp: number;
  maxTemp: number;
  rainfall: number;
  aqi: number;
}

export interface CityClimate {
  citySlug: string;
  monthly: MonthlyClimate[];
}

export const climateData: CityClimate[] = [
  {
    citySlug: "jeju",
    monthly: [
      { month: 1, avgTemp: 6, minTemp: 2, maxTemp: 9, rainfall: 60, aqi: 35 },
      { month: 2, avgTemp: 7, minTemp: 3, maxTemp: 10, rainfall: 55, aqi: 38 },
      { month: 3, avgTemp: 10, minTemp: 6, maxTemp: 14, rainfall: 75, aqi: 42 },
      { month: 4, avgTemp: 14, minTemp: 10, maxTemp: 18, rainfall: 80, aqi: 35 },
      { month: 5, avgTemp: 18, minTemp: 14, maxTemp: 22, rainfall: 90, aqi: 28 },
      { month: 6, avgTemp: 22, minTemp: 18, maxTemp: 26, rainfall: 170, aqi: 25 },
      { month: 7, avgTemp: 26, minTemp: 23, maxTemp: 30, rainfall: 210, aqi: 22 },
      { month: 8, avgTemp: 27, minTemp: 24, maxTemp: 31, rainfall: 250, aqi: 20 },
      { month: 9, avgTemp: 23, minTemp: 19, maxTemp: 27, rainfall: 180, aqi: 22 },
      { month: 10, avgTemp: 18, minTemp: 14, maxTemp: 22, rainfall: 80, aqi: 28 },
      { month: 11, avgTemp: 13, minTemp: 9, maxTemp: 17, rainfall: 70, aqi: 30 },
      { month: 12, avgTemp: 8, minTemp: 4, maxTemp: 12, rainfall: 50, aqi: 32 },
    ],
  },
  {
    citySlug: "busan-haeundae",
    monthly: [
      { month: 1, avgTemp: 3, minTemp: -1, maxTemp: 7, rainfall: 35, aqi: 40 },
      { month: 2, avgTemp: 5, minTemp: 1, maxTemp: 9, rainfall: 40, aqi: 42 },
      { month: 3, avgTemp: 9, minTemp: 5, maxTemp: 13, rainfall: 65, aqi: 48 },
      { month: 4, avgTemp: 14, minTemp: 9, maxTemp: 18, rainfall: 100, aqi: 40 },
      { month: 5, avgTemp: 18, minTemp: 13, maxTemp: 22, rainfall: 110, aqi: 32 },
      { month: 6, avgTemp: 21, minTemp: 17, maxTemp: 25, rainfall: 180, aqi: 28 },
      { month: 7, avgTemp: 25, minTemp: 22, maxTemp: 29, rainfall: 280, aqi: 25 },
      { month: 8, avgTemp: 27, minTemp: 23, maxTemp: 31, rainfall: 260, aqi: 23 },
      { month: 9, avgTemp: 23, minTemp: 19, maxTemp: 27, rainfall: 150, aqi: 25 },
      { month: 10, avgTemp: 18, minTemp: 13, maxTemp: 22, rainfall: 55, aqi: 30 },
      { month: 11, avgTemp: 12, minTemp: 7, maxTemp: 16, rainfall: 50, aqi: 35 },
      { month: 12, avgTemp: 5, minTemp: 1, maxTemp: 9, rainfall: 25, aqi: 38 },
    ],
  },
  {
    citySlug: "gangneung",
    monthly: [
      { month: 1, avgTemp: 0, minTemp: -4, maxTemp: 4, rainfall: 45, aqi: 25 },
      { month: 2, avgTemp: 2, minTemp: -3, maxTemp: 6, rainfall: 40, aqi: 28 },
      { month: 3, avgTemp: 7, minTemp: 2, maxTemp: 12, rainfall: 50, aqi: 32 },
      { month: 4, avgTemp: 12, minTemp: 7, maxTemp: 17, rainfall: 60, aqi: 28 },
      { month: 5, avgTemp: 17, minTemp: 12, maxTemp: 22, rainfall: 80, aqi: 22 },
      { month: 6, avgTemp: 21, minTemp: 17, maxTemp: 25, rainfall: 120, aqi: 18 },
      { month: 7, avgTemp: 24, minTemp: 21, maxTemp: 28, rainfall: 200, aqi: 15 },
      { month: 8, avgTemp: 25, minTemp: 22, maxTemp: 29, rainfall: 230, aqi: 15 },
      { month: 9, avgTemp: 21, minTemp: 16, maxTemp: 25, rainfall: 160, aqi: 18 },
      { month: 10, avgTemp: 15, minTemp: 10, maxTemp: 20, rainfall: 70, aqi: 20 },
      { month: 11, avgTemp: 8, minTemp: 3, maxTemp: 13, rainfall: 60, aqi: 22 },
      { month: 12, avgTemp: 2, minTemp: -3, maxTemp: 6, rainfall: 40, aqi: 24 },
    ],
  },
  {
    citySlug: "seoul-seongsu",
    monthly: [
      { month: 1, avgTemp: -3, minTemp: -7, maxTemp: 1, rainfall: 20, aqi: 65 },
      { month: 2, avgTemp: -1, minTemp: -5, maxTemp: 4, rainfall: 25, aqi: 68 },
      { month: 3, avgTemp: 5, minTemp: 0, maxTemp: 11, rainfall: 40, aqi: 72 },
      { month: 4, avgTemp: 12, minTemp: 7, maxTemp: 18, rainfall: 65, aqi: 60 },
      { month: 5, avgTemp: 18, minTemp: 13, maxTemp: 24, rainfall: 90, aqi: 48 },
      { month: 6, avgTemp: 23, minTemp: 18, maxTemp: 28, rainfall: 130, aqi: 42 },
      { month: 7, avgTemp: 26, minTemp: 22, maxTemp: 30, rainfall: 370, aqi: 38 },
      { month: 8, avgTemp: 26, minTemp: 22, maxTemp: 31, rainfall: 300, aqi: 35 },
      { month: 9, avgTemp: 22, minTemp: 16, maxTemp: 27, rainfall: 140, aqi: 38 },
      { month: 10, avgTemp: 14, minTemp: 8, maxTemp: 20, rainfall: 50, aqi: 45 },
      { month: 11, avgTemp: 6, minTemp: 1, maxTemp: 12, rainfall: 50, aqi: 55 },
      { month: 12, avgTemp: -1, minTemp: -5, maxTemp: 3, rainfall: 20, aqi: 62 },
    ],
  },
  {
    citySlug: "jeonju",
    monthly: [
      { month: 1, avgTemp: -1, minTemp: -5, maxTemp: 4, rainfall: 30, aqi: 52 },
      { month: 2, avgTemp: 1, minTemp: -3, maxTemp: 6, rainfall: 35, aqi: 55 },
      { month: 3, avgTemp: 7, minTemp: 2, maxTemp: 13, rainfall: 45, aqi: 58 },
      { month: 4, avgTemp: 13, minTemp: 7, maxTemp: 19, rainfall: 70, aqi: 48 },
      { month: 5, avgTemp: 18, minTemp: 13, maxTemp: 24, rainfall: 85, aqi: 40 },
      { month: 6, avgTemp: 23, minTemp: 18, maxTemp: 28, rainfall: 140, aqi: 35 },
      { month: 7, avgTemp: 26, minTemp: 22, maxTemp: 30, rainfall: 280, aqi: 30 },
      { month: 8, avgTemp: 26, minTemp: 22, maxTemp: 31, rainfall: 250, aqi: 28 },
      { month: 9, avgTemp: 22, minTemp: 16, maxTemp: 27, rainfall: 120, aqi: 32 },
      { month: 10, avgTemp: 14, minTemp: 8, maxTemp: 20, rainfall: 45, aqi: 40 },
      { month: 11, avgTemp: 7, minTemp: 2, maxTemp: 13, rainfall: 45, aqi: 48 },
      { month: 12, avgTemp: 1, minTemp: -4, maxTemp: 5, rainfall: 25, aqi: 50 },
    ],
  },
  {
    citySlug: "daejeon",
    monthly: [
      { month: 1, avgTemp: -2, minTemp: -6, maxTemp: 3, rainfall: 25, aqi: 58 },
      { month: 2, avgTemp: 0, minTemp: -4, maxTemp: 5, rainfall: 30, aqi: 60 },
      { month: 3, avgTemp: 6, minTemp: 1, maxTemp: 12, rainfall: 45, aqi: 62 },
      { month: 4, avgTemp: 13, minTemp: 7, maxTemp: 19, rainfall: 70, aqi: 52 },
      { month: 5, avgTemp: 18, minTemp: 13, maxTemp: 24, rainfall: 85, aqi: 42 },
      { month: 6, avgTemp: 23, minTemp: 18, maxTemp: 28, rainfall: 140, aqi: 38 },
      { month: 7, avgTemp: 26, minTemp: 22, maxTemp: 30, rainfall: 300, aqi: 32 },
      { month: 8, avgTemp: 26, minTemp: 22, maxTemp: 31, rainfall: 270, aqi: 30 },
      { month: 9, avgTemp: 21, minTemp: 16, maxTemp: 27, rainfall: 130, aqi: 35 },
      { month: 10, avgTemp: 14, minTemp: 8, maxTemp: 20, rainfall: 50, aqi: 42 },
      { month: 11, avgTemp: 7, minTemp: 2, maxTemp: 12, rainfall: 45, aqi: 52 },
      { month: 12, avgTemp: 0, minTemp: -5, maxTemp: 4, rainfall: 20, aqi: 56 },
    ],
  },
  {
    citySlug: "sokcho",
    monthly: [
      { month: 1, avgTemp: -1, minTemp: -5, maxTemp: 3, rainfall: 50, aqi: 20 },
      { month: 2, avgTemp: 1, minTemp: -3, maxTemp: 5, rainfall: 40, aqi: 22 },
      { month: 3, avgTemp: 6, minTemp: 1, maxTemp: 10, rainfall: 50, aqi: 25 },
      { month: 4, avgTemp: 11, minTemp: 6, maxTemp: 16, rainfall: 65, aqi: 22 },
      { month: 5, avgTemp: 16, minTemp: 11, maxTemp: 20, rainfall: 85, aqi: 18 },
      { month: 6, avgTemp: 20, minTemp: 16, maxTemp: 24, rainfall: 110, aqi: 15 },
      { month: 7, avgTemp: 23, minTemp: 20, maxTemp: 27, rainfall: 190, aqi: 12 },
      { month: 8, avgTemp: 24, minTemp: 21, maxTemp: 28, rainfall: 220, aqi: 12 },
      { month: 9, avgTemp: 20, minTemp: 15, maxTemp: 24, rainfall: 170, aqi: 15 },
      { month: 10, avgTemp: 14, minTemp: 9, maxTemp: 19, rainfall: 65, aqi: 18 },
      { month: 11, avgTemp: 7, minTemp: 2, maxTemp: 12, rainfall: 55, aqi: 20 },
      { month: 12, avgTemp: 1, minTemp: -4, maxTemp: 5, rainfall: 35, aqi: 20 },
    ],
  },
  {
    citySlug: "yeosu",
    monthly: [
      { month: 1, avgTemp: 3, minTemp: -1, maxTemp: 7, rainfall: 30, aqi: 30 },
      { month: 2, avgTemp: 4, minTemp: 0, maxTemp: 8, rainfall: 40, aqi: 32 },
      { month: 3, avgTemp: 8, minTemp: 4, maxTemp: 13, rainfall: 60, aqi: 35 },
      { month: 4, avgTemp: 13, minTemp: 9, maxTemp: 18, rainfall: 100, aqi: 30 },
      { month: 5, avgTemp: 18, minTemp: 13, maxTemp: 22, rainfall: 110, aqi: 25 },
      { month: 6, avgTemp: 21, minTemp: 17, maxTemp: 25, rainfall: 180, aqi: 22 },
      { month: 7, avgTemp: 25, minTemp: 22, maxTemp: 29, rainfall: 260, aqi: 20 },
      { month: 8, avgTemp: 26, minTemp: 23, maxTemp: 30, rainfall: 240, aqi: 18 },
      { month: 9, avgTemp: 23, minTemp: 18, maxTemp: 27, rainfall: 150, aqi: 20 },
      { month: 10, avgTemp: 17, minTemp: 12, maxTemp: 22, rainfall: 55, aqi: 25 },
      { month: 11, avgTemp: 11, minTemp: 6, maxTemp: 16, rainfall: 50, aqi: 28 },
      { month: 12, avgTemp: 5, minTemp: 1, maxTemp: 9, rainfall: 25, aqi: 30 },
    ],
  },
  {
    citySlug: "chuncheon",
    monthly: [
      { month: 1, avgTemp: -4, minTemp: -10, maxTemp: 1, rainfall: 20, aqi: 28 },
      { month: 2, avgTemp: -2, minTemp: -7, maxTemp: 4, rainfall: 25, aqi: 30 },
      { month: 3, avgTemp: 5, minTemp: 0, maxTemp: 11, rainfall: 40, aqi: 35 },
      { month: 4, avgTemp: 12, minTemp: 6, maxTemp: 18, rainfall: 65, aqi: 30 },
      { month: 5, avgTemp: 17, minTemp: 12, maxTemp: 23, rainfall: 85, aqi: 25 },
      { month: 6, avgTemp: 22, minTemp: 17, maxTemp: 27, rainfall: 130, aqi: 22 },
      { month: 7, avgTemp: 25, minTemp: 21, maxTemp: 29, rainfall: 350, aqi: 18 },
      { month: 8, avgTemp: 25, minTemp: 21, maxTemp: 30, rainfall: 290, aqi: 18 },
      { month: 9, avgTemp: 20, minTemp: 14, maxTemp: 26, rainfall: 140, aqi: 20 },
      { month: 10, avgTemp: 13, minTemp: 6, maxTemp: 19, rainfall: 55, aqi: 25 },
      { month: 11, avgTemp: 5, minTemp: -1, maxTemp: 11, rainfall: 45, aqi: 28 },
      { month: 12, avgTemp: -2, minTemp: -8, maxTemp: 3, rainfall: 20, aqi: 28 },
    ],
  },
  {
    citySlug: "seoul-hongdae",
    monthly: [
      { month: 1, avgTemp: -3, minTemp: -7, maxTemp: 1, rainfall: 20, aqi: 68 },
      { month: 2, avgTemp: -1, minTemp: -5, maxTemp: 4, rainfall: 25, aqi: 70 },
      { month: 3, avgTemp: 5, minTemp: 0, maxTemp: 11, rainfall: 40, aqi: 75 },
      { month: 4, avgTemp: 12, minTemp: 7, maxTemp: 18, rainfall: 65, aqi: 62 },
      { month: 5, avgTemp: 18, minTemp: 13, maxTemp: 24, rainfall: 90, aqi: 50 },
      { month: 6, avgTemp: 23, minTemp: 18, maxTemp: 28, rainfall: 130, aqi: 44 },
      { month: 7, avgTemp: 26, minTemp: 22, maxTemp: 30, rainfall: 370, aqi: 40 },
      { month: 8, avgTemp: 26, minTemp: 22, maxTemp: 31, rainfall: 300, aqi: 38 },
      { month: 9, avgTemp: 22, minTemp: 16, maxTemp: 27, rainfall: 140, aqi: 40 },
      { month: 10, avgTemp: 14, minTemp: 8, maxTemp: 20, rainfall: 50, aqi: 48 },
      { month: 11, avgTemp: 6, minTemp: 1, maxTemp: 12, rainfall: 50, aqi: 58 },
      { month: 12, avgTemp: -1, minTemp: -5, maxTemp: 3, rainfall: 20, aqi: 65 },
    ],
  },
  {
    citySlug: "gyeongju",
    monthly: [
      { month: 1, avgTemp: 1, minTemp: -3, maxTemp: 6, rainfall: 25, aqi: 38 },
      { month: 2, avgTemp: 3, minTemp: -2, maxTemp: 8, rainfall: 35, aqi: 40 },
      { month: 3, avgTemp: 8, minTemp: 3, maxTemp: 14, rainfall: 50, aqi: 42 },
      { month: 4, avgTemp: 14, minTemp: 8, maxTemp: 19, rainfall: 75, aqi: 38 },
      { month: 5, avgTemp: 18, minTemp: 13, maxTemp: 24, rainfall: 90, aqi: 30 },
      { month: 6, avgTemp: 22, minTemp: 17, maxTemp: 27, rainfall: 150, aqi: 28 },
      { month: 7, avgTemp: 26, minTemp: 22, maxTemp: 30, rainfall: 240, aqi: 25 },
      { month: 8, avgTemp: 26, minTemp: 22, maxTemp: 31, rainfall: 220, aqi: 22 },
      { month: 9, avgTemp: 22, minTemp: 17, maxTemp: 27, rainfall: 130, aqi: 25 },
      { month: 10, avgTemp: 16, minTemp: 10, maxTemp: 21, rainfall: 45, aqi: 30 },
      { month: 11, avgTemp: 9, minTemp: 4, maxTemp: 15, rainfall: 40, aqi: 35 },
      { month: 12, avgTemp: 3, minTemp: -2, maxTemp: 7, rainfall: 20, aqi: 38 },
    ],
  },
  {
    citySlug: "sejong",
    monthly: [
      { month: 1, avgTemp: -3, minTemp: -7, maxTemp: 2, rainfall: 25, aqi: 50 },
      { month: 2, avgTemp: -1, minTemp: -5, maxTemp: 4, rainfall: 28, aqi: 52 },
      { month: 3, avgTemp: 5, minTemp: 0, maxTemp: 11, rainfall: 42, aqi: 55 },
      { month: 4, avgTemp: 12, minTemp: 7, maxTemp: 18, rainfall: 68, aqi: 45 },
      { month: 5, avgTemp: 18, minTemp: 13, maxTemp: 24, rainfall: 88, aqi: 38 },
      { month: 6, avgTemp: 23, minTemp: 18, maxTemp: 28, rainfall: 135, aqi: 35 },
      { month: 7, avgTemp: 26, minTemp: 22, maxTemp: 30, rainfall: 310, aqi: 30 },
      { month: 8, avgTemp: 26, minTemp: 22, maxTemp: 31, rainfall: 280, aqi: 28 },
      { month: 9, avgTemp: 21, minTemp: 16, maxTemp: 27, rainfall: 135, aqi: 32 },
      { month: 10, avgTemp: 14, minTemp: 8, maxTemp: 20, rainfall: 48, aqi: 40 },
      { month: 11, avgTemp: 6, minTemp: 1, maxTemp: 12, rainfall: 48, aqi: 48 },
      { month: 12, avgTemp: -1, minTemp: -5, maxTemp: 3, rainfall: 22, aqi: 50 },
    ],
  },
  {
    citySlug: "gwangju",
    monthly: [
      { month: 1, avgTemp: 0, minTemp: -4, maxTemp: 5, rainfall: 35, aqi: 52 },
      { month: 2, avgTemp: 2, minTemp: -2, maxTemp: 7, rainfall: 40, aqi: 55 },
      { month: 3, avgTemp: 7, minTemp: 2, maxTemp: 13, rainfall: 55, aqi: 58 },
      { month: 4, avgTemp: 14, minTemp: 8, maxTemp: 19, rainfall: 80, aqi: 48 },
      { month: 5, avgTemp: 19, minTemp: 14, maxTemp: 24, rainfall: 95, aqi: 38 },
      { month: 6, avgTemp: 23, minTemp: 19, maxTemp: 28, rainfall: 170, aqi: 32 },
      { month: 7, avgTemp: 26, minTemp: 23, maxTemp: 30, rainfall: 290, aqi: 28 },
      { month: 8, avgTemp: 27, minTemp: 23, maxTemp: 31, rainfall: 260, aqi: 25 },
      { month: 9, avgTemp: 22, minTemp: 17, maxTemp: 27, rainfall: 130, aqi: 28 },
      { month: 10, avgTemp: 15, minTemp: 9, maxTemp: 21, rainfall: 45, aqi: 38 },
      { month: 11, avgTemp: 8, minTemp: 3, maxTemp: 14, rainfall: 50, aqi: 48 },
      { month: 12, avgTemp: 2, minTemp: -3, maxTemp: 6, rainfall: 28, aqi: 50 },
    ],
  },
  {
    citySlug: "aewol",
    monthly: [
      { month: 1, avgTemp: 6, minTemp: 3, maxTemp: 10, rainfall: 55, aqi: 32 },
      { month: 2, avgTemp: 7, minTemp: 3, maxTemp: 10, rainfall: 50, aqi: 35 },
      { month: 3, avgTemp: 10, minTemp: 6, maxTemp: 14, rainfall: 70, aqi: 38 },
      { month: 4, avgTemp: 14, minTemp: 10, maxTemp: 18, rainfall: 75, aqi: 32 },
      { month: 5, avgTemp: 18, minTemp: 14, maxTemp: 22, rainfall: 85, aqi: 25 },
      { month: 6, avgTemp: 22, minTemp: 18, maxTemp: 26, rainfall: 165, aqi: 22 },
      { month: 7, avgTemp: 26, minTemp: 23, maxTemp: 30, rainfall: 200, aqi: 20 },
      { month: 8, avgTemp: 27, minTemp: 24, maxTemp: 31, rainfall: 245, aqi: 18 },
      { month: 9, avgTemp: 23, minTemp: 19, maxTemp: 27, rainfall: 175, aqi: 20 },
      { month: 10, avgTemp: 18, minTemp: 14, maxTemp: 22, rainfall: 75, aqi: 25 },
      { month: 11, avgTemp: 13, minTemp: 9, maxTemp: 17, rainfall: 65, aqi: 28 },
      { month: 12, avgTemp: 8, minTemp: 4, maxTemp: 12, rainfall: 48, aqi: 30 },
    ],
  },
  {
    citySlug: "pangyo",
    monthly: [
      { month: 1, avgTemp: -4, minTemp: -8, maxTemp: 0, rainfall: 18, aqi: 62 },
      { month: 2, avgTemp: -1, minTemp: -6, maxTemp: 3, rainfall: 22, aqi: 65 },
      { month: 3, avgTemp: 5, minTemp: 0, maxTemp: 10, rainfall: 38, aqi: 68 },
      { month: 4, avgTemp: 12, minTemp: 6, maxTemp: 17, rainfall: 62, aqi: 55 },
      { month: 5, avgTemp: 17, minTemp: 12, maxTemp: 23, rainfall: 88, aqi: 45 },
      { month: 6, avgTemp: 22, minTemp: 17, maxTemp: 27, rainfall: 128, aqi: 40 },
      { month: 7, avgTemp: 25, minTemp: 21, maxTemp: 29, rainfall: 360, aqi: 35 },
      { month: 8, avgTemp: 26, minTemp: 22, maxTemp: 30, rainfall: 290, aqi: 32 },
      { month: 9, avgTemp: 21, minTemp: 15, maxTemp: 26, rainfall: 135, aqi: 35 },
      { month: 10, avgTemp: 13, minTemp: 7, maxTemp: 19, rainfall: 48, aqi: 42 },
      { month: 11, avgTemp: 5, minTemp: 0, maxTemp: 11, rainfall: 48, aqi: 52 },
      { month: 12, avgTemp: -2, minTemp: -7, maxTemp: 2, rainfall: 18, aqi: 60 },
    ],
  },
];

export function getClimateForCity(citySlug: string): CityClimate | undefined {
  return climateData.find((c) => c.citySlug === citySlug);
}

export function getMonthlyClimate(
  citySlug: string,
  month: number
): MonthlyClimate | undefined {
  const city = getClimateForCity(citySlug);
  return city?.monthly.find((m) => m.month === month);
}

export function getSeasonMonths(
  season: "spring" | "summer" | "autumn" | "winter"
): number[] {
  switch (season) {
    case "spring":
      return [3, 4, 5];
    case "summer":
      return [6, 7, 8];
    case "autumn":
      return [9, 10, 11];
    case "winter":
      return [12, 1, 2];
  }
}

export function getSeasonAverage(
  cityClimate: CityClimate,
  season: "spring" | "summer" | "autumn" | "winter"
): { avgTemp: number; avgAqi: number; avgRainfall: number } {
  const months = getSeasonMonths(season);
  const seasonData = cityClimate.monthly.filter((m) =>
    months.includes(m.month)
  );

  const avgTemp =
    seasonData.reduce((sum, m) => sum + m.avgTemp, 0) / seasonData.length;
  const avgAqi =
    seasonData.reduce((sum, m) => sum + m.aqi, 0) / seasonData.length;
  const avgRainfall =
    seasonData.reduce((sum, m) => sum + m.rainfall, 0) / seasonData.length;

  return {
    avgTemp: Math.round(avgTemp * 10) / 10,
    avgAqi: Math.round(avgAqi),
    avgRainfall: Math.round(avgRainfall),
  };
}
