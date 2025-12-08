// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      {/* 白いカード */}
      <div className="w-full max-w-sm rounded-xl bg-white shadow-md px-8 py-10 flex flex-col gap-6">
        {/* ヘッダー（アプリ名） */}
        <h1 className="text-xl font-bold text-center border-b pb-2">
          アプリ名（ヘッダー）
        </h1>

        {/* 開始ボタン */}
        <Link
          href="/select"
          className="w-full rounded-lg border border-blue-300 bg-blue-50 py-3 text-center text-base font-medium hover:bg-blue-100 transition"
        >
          開始ボタン
        </Link>

        {/* 履歴ボタン */}
        <Link
          href="/history"
          className="w-full rounded-lg border border-slate-300 bg-white py-3 text-center text-base hover:bg-slate-50 transition"
        >
          履歴
        </Link>
      </div>
    </main>
  );
}
