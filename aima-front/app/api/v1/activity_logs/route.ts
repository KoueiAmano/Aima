// app/api/v1/activity_logs/route.ts
import { NextRequest, NextResponse } from "next/server";

// Rails 側のベースURL（.env.local で上書き可）
const BACKEND_BASE =
  process.env.BACKEND_BASE_URL ?? "http://localhost:3001";

export async function GET(_req: NextRequest) {
  const backendUrl = `${BACKEND_BASE}/api/v1/activity_logs`;

  const res = await fetch(backendUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("backend GET /activity_logs error", res.status, text);
    // Rails からのエラー内容をそのまま返す
    return new NextResponse(text, { status: res.status });
  }

  return new NextResponse(text, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.text(); // そのままパススルー

  const backendUrl = `${BACKEND_BASE}/api/v1/activity_logs`;

  const res = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("backend POST /activity_logs error", res.status, text);
    return new NextResponse(text, { status: res.status });
  }

  return new NextResponse(text, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
