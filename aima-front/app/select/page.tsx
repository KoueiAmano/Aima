// app/select/page.tsx
import Link from "next/link";

export default function SelectPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-md px-8 py-10 flex flex-col gap-6">
        <h1 className="text-xl font-bold border-b pb-2">選択画面</h1>

        <p className="text-sm text-slate-500">
          ここに「15 / 30 / 60 分」「気分」「やりたいこと」などの選択肢ボタンを並べていく予定。
        </p>

        {/* ホームに戻る */}
        <div className="mt-4">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50 transition"
          >
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
