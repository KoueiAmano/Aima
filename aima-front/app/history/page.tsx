"use client";

import { useEffect, useState } from "react";
import { getActivityLogs } from "@/lib/api";
import type { ActivityLogForHistory } from "@/lib/types";

export default function HistoryPage() {
  const [logs, setLogs] = useState<ActivityLogForHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getActivityLogs()
      .then(({ activity_logs }) => setLogs(activity_logs))
      .catch((e) => {
        console.error(e);
        setError("履歴の取得に失敗しました");
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔥 ローディング表示 — return のいちばん上でOK
  if (loading) {
    return (
      <main style={{ padding: 24 }}>
        履歴を読み込み中...
      </main>
    );
  }

  // 🔥 エラー表示 — ローディングの次に置く
  if (error) {
    return (
      <main style={{ padding: 24 }}>
        {error}
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>履歴</h1>

      {logs.length === 0 ? (
        <p>まだ履歴がありません。</p>
      ) : (
        <ul>
          {logs.map((log) => (
            <li key={log.id} style={{ marginBottom: 16 }}>
              <h3>{log.recipe_title}</h3>
              <p>
                日時:{" "}
                {new Date(log.executed_at).toLocaleString("ja-JP", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>
              <p>
                時間: {log.duration_min}分 / 気分: {log.mood} / 評価:
                {log.feedback}
              </p>
              <p>天気: {log.weather}</p>
              <p>{log.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
