// app/api/v1/recommendations/route.ts
import { NextResponse } from "next/server";

const RAW_BACKEND_BASE = process.env.BACKEND_API_BASE_URL;
const BACKEND_BASE =
  RAW_BACKEND_BASE && RAW_BACKEND_BASE.trim().length > 0
    ? RAW_BACKEND_BASE.trim()
    : "http://localhost:3001"; // Rails 用のデフォルト

export async function POST(req: Request) {
  try {
    // フロントから来た JSON をそのまま Rails に中継したいので text として読む
    const bodyText = await req.text();

    const backendRes = await fetch(`${BACKEND_BASE}/api/v1/recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyText,
    });

    const text = await backendRes.text();

    if (!backendRes.ok) {
      console.error(
        "[recommendations route] backend error",
        backendRes.status,
        text
      );
      return new NextResponse(text || "backend error", {
        status: backendRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(text, {
      status: backendRes.status,
      headers: {
        "Content-Type":
          backendRes.headers.get("content-type") || "application/json",
      },
    });
  } catch (e) {
    console.error("[recommendations route] proxy error", e);
    return NextResponse.json(
      { error: "proxy error", detail: String(e) },
      { status: 500 }
    );
  }
}
