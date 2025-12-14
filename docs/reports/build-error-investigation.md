# npm run build エラー調査レポート

## 調査日時
2025年12月14日

## エラー内容

### ビルドエラー
```
Failed to compile.

.next/dev/types/validator.ts:116:39
Type error: Cannot find module '../../../app/api/health/route.js' or its corresponding type declarations.
```

## 原因

Next.js 16のTurbopackビルド時に、`app/api/health/route.ts`ファイルが存在しないためTypeScriptの型チェックでエラーが発生している。

### 現状の構造
- `app/health/page.tsx` - ヘルスチェック表示用のページコンポーネント（存在する）
- `lib/api.ts` の `checkHealth()` 関数が `/api/health` エンドポイントを呼び出している
- **`app/api/health/route.ts` が存在しない** ← 問題の根本原因

### 関連ファイル

1. **lib/api.ts** (248行目)
   - `checkHealth()` 関数が `/api/health` エンドポイントを fetch している
   ```typescript
   const res = await fetch("/api/health", {
     method: "GET",
     cache: "no-store",
     headers: {
       "Content-Type": "application/json",
     },
   });
   ```

2. **app/health/page.tsx**
   - `checkHealth()` を使用してヘルスチェックを実行するUIページ

3. **app/api/v1/** (参考)
   - `recommendations/route.ts` - バックエンドへのプロキシ実装例
   - `activity_logs/route.ts` - バックエンドへのプロキシ実装例

## 解決策

`app/api/health/route.ts` を作成し、バックエンドの `/health` エンドポイントへプロキシする必要がある。

### 実装すべき内容
- GETリクエストを受け付ける
- バックエンド（Rails）の `/health` エンドポイントにプロキシする
- レスポンスをそのまま返す
- エラーハンドリングを実装する

### 参考実装
他のAPIルート（`app/api/v1/recommendations/route.ts`等）と同様のパターンで実装可能。

## 影響範囲
- 本番ビルド (`npm run build`) が失敗する
- 開発環境では問題が顕在化していない可能性がある（型チェックの厳密さの違い）
- ヘルスチェック機能が実際には動作していない可能性がある
