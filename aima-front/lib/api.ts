// lib/api.ts
import {
  ActivityLogCreated,
  ActivityLogsResponse,
  DurationMin,
  Feedback,
  Mood,
  RecommendationResponse,
  User,
} from "./types";

// ========================
// モック切り替えフラグ
// ========================
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

// ========================
// 共通 requestJson
// ========================
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

async function requestJson<T>(
  path: string,
  options: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("API error", res.status, text);
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

// ========================
// 1. POST /api/v1/users
// ========================
export async function createUser(params: {
  name: string;
  personality: string;
  preference: string;
}): Promise<User> {
  return requestJson<User>("/api/v1/users", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

// ========================
// 2. POST /api/v1/recommendations
// ========================
// ========================
// 2. POST /api/v1/recommendations
// ========================
export async function createRecommendation(params: {
  mood: Mood;
  duration_min: DurationMin;
  weather?: string;
}): Promise<RecommendationResponse> {
  if (USE_MOCK) {
    return createRecommendationMock();
  }

  return requestJson<RecommendationResponse>("/api/v1/recommendations", {
    method: "POST",
    body: JSON.stringify(params),
  });
}


// ========================
// 3. POST /api/v1/activity_logs
// ========================
export async function createActivityLog(params: {
  recipe_id: number;
  mood: Mood;
  duration_min: DurationMin;
  weather?: string;
  feedback: Feedback;
}): Promise<ActivityLogCreated> {
  return requestJson<ActivityLogCreated>("/api/v1/activity_logs", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

// ========================
// 4. GET /api/v1/activity_logs
//    - モック / 本番 切り替えポイント
// ========================

// モック版（export しない）
async function getActivityLogsMock(): Promise<ActivityLogsResponse> {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
  return {
    activity_logs: [
      {
        id: 1,
        recipe_id: 5,
        recipe_title: "散歩に行く",
        recipe_category: "outdoor",
        description: "少し歩くだけで気分転換になる",
        mood: "calm",
        feedback: "good",
        duration_min: 15,
        weather: "sunny",
        executed_at: new Date().toISOString(),
      },
    ],
  };
}

async function createRecommendationMock() {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
  return {
    recipes: [
      {
        id: 1,
        title: "外の空気を吸いにいく",
        category: "outdoor",
        description: "5分だけ外を歩こう。日光を浴びて気分転換。",
      },
      {
        id: 2,
        title: "机の整理",
        category: "life",
        description: "机の上の不要物を片付け、小さく達成感を作る。",
      },
      {
        id: 3,
        title: "今週頑張ったことを1つ書く",
        category: "reflect",
        description: "今日 or 今週「自分ができたこと」をメモに書く。",
      },
    ],
  };
}


// 外から使うのはこの1個だけ
export async function getActivityLogs(): Promise<ActivityLogsResponse> {
  if (USE_MOCK) {
    // バックエンドなしでもここで完結
    return getActivityLogsMock();
  }

  // 本番APIを叩く
  return requestJson<ActivityLogsResponse>("/api/v1/activity_logs", {
    method: "GET",
  });
}
