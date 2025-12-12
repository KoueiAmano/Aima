// lib/api.ts
import {
  ActivityLogCreated,
  ActivityLogsResponse,
  DurationMin,
  Feedback,
  Mood,
  RecommendationResponse,
  Personality,
  Preference,
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
console.log("API_BASE =", API_BASE);

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
  personality: Personality;
  preference: Preference;
}): Promise<User> {
  if (USE_MOCK) return createUserMock(params);

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
  weather?: import("./types").Weather;
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
  weather?: import("./types").Weather;
  feedback: Feedback;
}): Promise<ActivityLogCreated> {
  if (USE_MOCK) return createActivityLogMock(params);

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

async function createRecommendationMock(): Promise<RecommendationResponse> {
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

async function createUserMock(params: {
  name: string;
  personality: Personality;
  preference: Preference;
}): Promise<User> {
  await new Promise((r) => setTimeout(r, 600));
  return {
    id: 1, // 仮で固定でもOK（本当は連番っぽくしてもいい）
    name: params.name,
    personality: params.personality,
    preference: params.preference,
  };
}

async function createActivityLogMock(params: {
  recipe_id: number;
  mood: Mood;
  duration_min: DurationMin;
  weather?: import("./types").Weather;
  feedback: Feedback;
}): Promise<ActivityLogCreated> {
  await new Promise((r) => setTimeout(r, 600));
  return {
    id: 1,
    user_id: 1,
    recipe_id: params.recipe_id,
    mood: params.mood,
    feedback: params.feedback,
    duration_min: params.duration_min,
    weather: params.weather ?? "sunny",
    executed_at: new Date().toISOString(),
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


// ヘルスチェックのレスポンス型定義
export type HealthCheckResponse = {
  status: string;
  time: string;
};

// ヘルスチェック実行関数
export async function checkHealth(): Promise<HealthCheckResponse> {
  // モックモードなら固定レスポンス
  if (USE_MOCK) {
    return { status: "ok (mock)", time: new Date().toISOString() };
  }

  // ✅ ここは API_BASE 経由にしない！
  // ブラウザからは Next の Route Handler (/api/health) だけ叩く
  const res = await fetch("/api/health", {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Health check error", res.status, text);
    throw new Error(`Health check failed: ${res.status}`);
  }

  return res.json();
}
