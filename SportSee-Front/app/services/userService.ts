import { apiFetch } from "./api";

type UserInfoResponse = {
  profile: {
    firstName: string;
    lastName: string;
    createdAt: string;
    age: number;
    gender?: string;
    height: number;
    weight: number;
    profilePicture?: string;
  };
  statistics: {
    totalDistance: string;
    totalSessions: number;
    totalDuration: number;
  };
};

type ActivitySession = {
  date: string;
  duration: number;
  caloriesBurned: number;
  distance: number;
  heartRate: {
    min: number;
    max: number;
    average: number;
  };
};

export function getUserInfo(): Promise<UserInfoResponse> {
  return apiFetch("/api/user-info");
}

export function getUserActivity(
  startWeek: string,
  endWeek: string,
): Promise<ActivitySession[]> {
  return apiFetch(
    `/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`,
  );
}