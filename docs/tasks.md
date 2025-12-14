# health routes.ts 作成計画

## 目的
`GET /api/v1/health` エンドポイントを実装し、バックエンドのヘルスチェックAPIにプロキシする

## 背景
- 現在 `lib/api.ts` の `checkHealth()` が `/api/health` を呼び出している
- しかし対応する route handler が存在せず、ビルドエラーが発生
- バックエンドには `GET /api/v1/health` (Rails) が既に実装済み

## 実装タスク

### 1. ファイル作成
**ファイルパス**: `aima-front/app/api/v1/health/route.ts`

### 2. 実装内容

#### GETハンドラー実装
- `BACKEND_BASE` の環境変数から取得（他のAPIルートと同様）
  - `process.env.BACKEND_API_BASE_URL` または `http://localhost:3000`
- バックエンドの `GET /api/v1/health` にプロキシ
- レスポンスをそのまま返す
- エラーハンドリング実装

#### 参考実装パターン
`app/api/v1/activity_logs/route.ts` のGETメソッドと同様のパターン:
- `BACKEND_BASE` の定義
- `fetch()` でバックエンドに転送
- レスポンスのステータスとヘッダーをそのまま返す
- try-catch でエラーハンドリング
- コンソールログでデバッグ情報出力

### 3. lib/api.ts の修正
**ファイルパス**: `aima-front/lib/api.ts`

#### checkHealth() 関数の修正（248-272行目）
- 現在: `/api/health` を呼び出し
- 変更後: `/api/v1/health` を呼び出し

### 4. 検証
実装後に以下を確認:
- `npm run build` が成功すること
- ヘルスチェック機能が正常に動作すること

## バックエンド情報（参考）
- エンドポイント: `GET /api/v1/health`
- コントローラー: `back/app/controllers/api/v1/health_controller.rb`
- レスポンス: `{ status: "ok", time: "2025-12-14T..." }`

## 関連ファイル
- `aima-front/app/api/v1/health/route.ts` (新規作成)
- `aima-front/lib/api.ts` (修正)
- `aima-front/app/health/page.tsx` (参照のみ、変更不要)
