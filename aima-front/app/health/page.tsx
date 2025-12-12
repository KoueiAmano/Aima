"use client";

import { useEffect, useState } from "react";
import { checkHealth } from "@/lib/api"; // 追加した関数をインポート

export default function HealthCheckPage() {
  const [status, setStatus] = useState<string>("確認中...");

  useEffect(() => {
    checkHealth()
      .then((res) => {
        console.log("Health Check Result:", res);
        setStatus(`OK: ${res.status} at ${res.time}`);
      })
      .catch((err) => {
        console.error(err);
        setStatus("エラー: バックエンドに接続できません");
      });
  }, []);

  return (
    <div className="p-10">
      <h1>サーバー接続テスト</h1>
      <p>ステータス: {status}</p>
    </div>
  );
}