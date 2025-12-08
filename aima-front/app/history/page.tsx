// app/history/page.tsx
import Link from "next/link";

export default function HistoryPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-md px-8 py-10 flex flex-col gap-6">
        <h1 className="text-xl font-bold border-b pb-2">履歴画面</h1>

        {/* ダミー履歴 */}
        <div className="space-y-3 text-sm">
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="font-medium">2025-12-08 / 15分 / まったり</div>
            <div className="text-slate-500 text-xs">
              レシピ：机の上だけ片付ける
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="font-medium">2025-12-07 / 30分 / ワクワク</div>
            <div className="text-slate-500 text-xs">
              レシピ：気になっていた動画を1本だけ見る
            </div>
          </div>
        </div>

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
