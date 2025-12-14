// app/api/v1/health/route.ts
import { NextResponse } from "next/server";

const BACKEND_BASE =
  process.env.BACKEND_API_BASE_URL?.trim() || "http://localhost:3000";

export async function GET(req: Request) {
  try {
    const backendUrl = `${BACKEND_BASE}/api/v1/health`;

    const res = await fetch(backendUrl, {
      method: "GET",
      cache: "no-store",
    });

    const text = await res.text();

    if (!res.ok) {
      console.error("[health route] backend error", res.status, text);
    }

    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/json",
      },
    });
  } catch (e) {
    console.error("[health route] proxy error", e);
    return NextResponse.json(
      { error: "proxy error", detail: String(e) },
      { status: 500 }
    );
  }
}
