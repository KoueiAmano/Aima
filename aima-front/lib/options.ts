// lib/options.ts１
import type { Personality, Preference, Mood, Weather } from "./types";

export const timeOptions = [15, 30, 60] as const;

export const moodOptions: { id: Mood; label: string }[] = [
  { id: "energetic", label: "元気" },
  { id: "neutral", label: "ふつう" },
  { id: "calm", label: "落ち着いている" },
];

export const placeOptions: { id: Weather; label: string }[] = [
  { id: "sunny", label: "晴れ" },
  { id: "cloudy", label: "くもり" },
  { id: "rainy", label: "雨" },
];

export const personalityOptions: { id: Personality; label: string }[] = [
  { id: "energetic", label: "元気に動きたい" },
  { id: "neutral", label: "ふつう・どちらでも" },
  { id: "calm", label: "ゆっくり落ち着きたい" },
];

export const preferenceOptions: { id: Preference; label: string }[] = [
  { id: "outdoor", label: "外に出るのが好き" },
  { id: "both", label: "どちらも好き" },
  { id: "indoor", label: "おうちが好き" },
];

export type TimeOption = typeof timeOptions[number];

export type LabelOption<T extends string> = { id: T; label: string };

export default {};
