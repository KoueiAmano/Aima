// app/api/v1/activity_logs/route.ts
import { NextResponse } from "next/server";

const BACKEND_BASE =
  process.env.BACKEND_API_BASE_URL?.trim() || "http://localhost:3000";

export async function GET(req: Request) {
  try {
    // ✅ クエリをそのまま中継（limitなど）
    const url = new URL(req.url);
    const backendUrl = `${BACKEND_BASE}/api/v1/activity_logs${url.search}`;

    const res = await fetch(backendUrl, {
      method: "GET",
      cache: "no-store",
      // GETで Content-Type は必須じゃない（付けても動くけど不要）
    });

    const text = await res.text();

    if (!res.ok) {
      console.error("[activity_logs route] backend error", res.status, text);
    }

    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/json",
      },
    });
  } catch (e) {
    console.error("[activity_logs route] proxy error", e);
    return NextResponse.json({ error: "proxy error", detail: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();

    const backendRes = await fetch(`${BACKEND_BASE}/api/v1/activity_logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bodyText,
    });

    const text = await backendRes.text();

    if (!backendRes.ok) {
      console.error("[activity_logs route] backend error", backendRes.status, text);
    }

    return new NextResponse(text, {
      status: backendRes.status,
      headers: {
        "Content-Type": backendRes.headers.get("content-type") || "application/json",
      },
    });
  } catch (e) {
    console.error("[activity_logs route] proxy error", e);
    return NextResponse.json({ error: "proxy error", detail: String(e) }, { status: 500 });
  }
}
