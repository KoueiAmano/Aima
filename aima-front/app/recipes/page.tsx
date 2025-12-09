// app/recipes/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createRecommendation } from "@/lib/api";
import type { Recipe, DurationMin, Mood } from "@/lib/types";

type RecipesPageProps = {};

// time の文字列を 15/30/60 に変換
function parseDuration(time?: string | null): DurationMin {
  const n = Number(time);
  if (n === 15 || n === 30 || n === 60) return n;
  return 30;
}

// mood の文字列を型に変換
function parseMood(mood?: string | null): Mood {
  if (mood === "energetic" || mood === "neutral" || mood === "calm") {
    return mood;
  }
  return "neutral";
}

export default function RecipesPage({}: RecipesPageProps) {
  const params = useSearchParams();
  const router = useRouter();

  const duration = parseDuration(params.get("time"));
  const mood = parseMood(params.get("mood"));

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // レコメンドAPI（モック or 本番）を叩く
  useEffect(() => {
    setLoading(true);
    setError(null);

    createRecommendation({
      duration_min: duration,
      mood,
      weather: "sunny", // とりあえず固定
    })
      .then((res) => {
        setRecipes(res.recipes);
        // 最初は何も選ばない（必要なら先頭をデフォルト選択でもOK）
        setSelectedRecipeId(null);
      })
      .catch((e) => {
        console.error(e);
        setError("レシピの取得に失敗しました");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [duration, mood]);

  // 「決定」ボタンを押したときの処理
  const handleConfirm = () => {
    if (selectedRecipeId == null) {
      alert("レシピを1つ選んでください");
      return;
    }

    const query = new URLSearchParams({
      recipeId: String(selectedRecipeId),
      time: String(duration),
      mood,
    });

    router.push(`/review?${query.toString()}`);
  };

 if (loading) {
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: 600,
      }}
    >
      🔄 おすすめプランを生成中...
    </main>
  );
}


  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 16 }}>あなたへの行動レシピ</h1>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, marginBottom: 8 }}>今回の条件</h2>
        <p style={{ fontSize: 14, color: "#555" }}>
          時間：{duration} 分 / 気分：{mood}
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, marginBottom: 8 }}>レシピ候補</h2>

        <ul style={{ display: "grid", gap: 12, padding: 0, listStyle: "none" }}>
          {recipes.map((recipe) => {
            const isSelected = selectedRecipeId === recipe.id;
            return (
              <li key={recipe.id}>
                <button
                  type="button"
                  onClick={() => setSelectedRecipeId(recipe.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: isSelected
                      ? "2px solid #4f46e5"
                      : "1px solid #ddd",
                    borderRadius: 12,
                    padding: 16,
                    backgroundColor: isSelected ? "#eef2ff" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: 16 }}>{recipe.title}</h3>
                    <span
                      style={{
                        fontSize: 12,
                        padding: "4px 8px",
                        borderRadius: 999,
                        backgroundColor: "#f3f4f6",
                        color: "#4b5563",
                      }}
                    >
                      {recipe.category}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: "#374151", margin: 0 }}>
                    {recipe.description}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={selectedRecipeId == null}
          style={{
            minWidth: 200,
            padding: "10px 20px",
            borderRadius: 999,
            border: "none",
            backgroundColor:
              selectedRecipeId == null ? "#d1d5db" : "#4f46e5",
            color: "#fff",
            cursor: selectedRecipeId == null ? "not-allowed" : "pointer",
            fontWeight: 600,
          }}
        >
          このレシピでレビューへ進む
        </button>
      </div>
    </main>
  );
}
