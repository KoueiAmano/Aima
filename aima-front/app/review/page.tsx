// app/review/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createActivityLog } from "@/lib/api";
import type { DurationMin, Mood, Feedback } from "@/lib/types";

function parseDuration(time: string | null): DurationMin {
  const n = Number(time);
  if (n === 15 || n === 30 || n === 60) {
    return n;
  }
  return 30; // デフォルト
}

function parseMood(mood: string | null): Mood {
  if (mood === "energetic" || mood === "neutral" || mood === "calm") {
    return mood;
  }
  return "neutral";
}

const feedbackOptions: { id: Feedback; label: string }[] = [
  { id: "good", label: "よかった" },
  { id: "normal", label: "ふつう" },
  { id: "bad", label: "いまいち" },
];

export default function ReviewPage() {
  const router = useRouter();
  const params = useSearchParams();

  const recipeIdParam = params.get("recipeId");
  const timeParam = params.get("time");
  const moodParam = params.get("mood");

  // 必須パラメータが欠けていたらエラー表示
  if (!recipeIdParam) {
    return (
      <main style={{ padding: 24 }}>
        <h1>評価画面</h1>
        <p>レシピが選択されていません。</p>
        <button onClick={() => router.push("/")}>ホームに戻る</button>
      </main>
    );
  }

  const recipeId = Number(recipeIdParam);
  const duration = parseDuration(timeParam);
  const mood = parseMood(moodParam);

  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedFeedback) {
      alert("評価を選んでください");
      return;
    }

    setSubmitting(true);
    setError(null);

      try {
    await createActivityLog({
      recipe_id: recipeId,
      mood,
      duration_min: duration,
      weather: "sunny", // とりあえず固定値。あとで変えたければ変えられる
      feedback: selectedFeedback,
    });

    // ✅ 送信後はホーム画面に戻る
    router.push("/");
  } catch (e) {
    console.error(e);
    setError("送信に失敗しました。時間をおいて再度お試しください。");
    setSubmitting(false);
  }

  };

  return (
    <main style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 16 }}>今回のレシピの評価</h1>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, marginBottom: 8 }}>今回の条件</h2>
        <ul style={{ fontSize: 14, color: "#555" }}>
          <li>時間：{duration} 分</li>
          <li>気分：{mood}</li>
          {/* 必要なら recipes からタイトルをクエリで渡して表示してもOK */}
        </ul>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, marginBottom: 8 }}>どうだった？</h2>
        <div style={{ display: "flex", gap: 12 }}>
          {feedbackOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedFeedback(opt.id)}
              style={{
                padding: "10px 16px",
                borderRadius: 8,
                border:
                  selectedFeedback === opt.id
                    ? "2px solid #4f46e5"
                    : "1px solid #ccc",
                backgroundColor:
                  selectedFeedback === opt.id ? "#eef2ff" : "#fff",
                cursor: "pointer",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      {error && (
        <p style={{ color: "red", fontSize: 14, marginBottom: 12 }}>{error}</p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        style={{
          padding: "10px 20px",
          borderRadius: 999,
          border: "none",
          backgroundColor: submitting ? "#cbd5f5" : "#4f46e5",
          color: "#fff",
          cursor: submitting ? "default" : "pointer",
        }}
      >
        {submitting ? "送信中..." : "この評価で保存する"}
      </button>
    </main>
  );
}
