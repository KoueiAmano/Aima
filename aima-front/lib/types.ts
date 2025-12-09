// lib/types.ts

// 共通の enum 的なやつ
export type Personality = "energetic" | "neutral" | "calm";
export type Preference = "outdoor" | "both" | "indoor";
export type Mood = "energetic" | "neutral" | "calm";
export type Feedback = "good" | "normal" | "bad";
export type DurationMin = 15 | 30 | 60;

// 1. POST /users のレスポンス
export type User = {
  id: number;
  name: string;
  personality: Personality;
  preference: Preference;
};

// 2. POST /recommendations のレスポンス
export type Recipe = {
  id: number;
  title: string;
  category: string;
  description: string;
};

export type RecommendationResponse = {
  recipes: Recipe[];
};

// 3. POST /activity_logs のレスポンス
export type ActivityLogCreated = {
  id: number;
  user_id: number;
  recipe_id: number;
  mood: Mood;
  feedback: Feedback;
  duration_min: DurationMin;
  weather: string;
  executed_at: string; // ISO文字列
};

// 4. GET /activity_logs のレスポンス
export type ActivityLogForHistory = {
  id: number;
  recipe_id: number;
  recipe_title: string;
  recipe_category: string;
  description: string;
  mood: Mood;
  feedback: Feedback;
  duration_min: DurationMin;
  weather: string;
  executed_at: string; // ISO文字列
};

export type ActivityLogsResponse = {
  activity_logs: ActivityLogForHistory[];
};
