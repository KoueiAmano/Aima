// app/api/v1/recommendations/route.ts
import { NextResponse } from "next/server";
console.log("BACKEND_API_BASE_URL =", process.env.BACKEND_API_BASE_URL);

const RAW_BACKEND_BASE = process.env.BACKEND_API_BASE_URL;
const BACKEND_BASE =
  RAW_BACKEND_BASE && RAW_BACKEND_BASE.trim().length > 0
    ? RAW_BACKEND_BASE.trim()
    : "http://localhost:3000"; // Rails 用のデフォルト

export async function POST(req: Request) {
  try {
    // フロントから来た JSON をそのまま Rails に中継したいので text として読む
    const bodyText = await req.text();
console.log("[recommendations route] proxy to:", `${BACKEND_BASE}/api/v1/recommendations`);

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
console.log("BACKEND_BASE_URL =", process.env.BACKEND_BASE_URL);

    return new NextResponse(text, {
      status: backendRes.status,
      headers: {
        "Content-Type":
          backendRes.headers.get("content-type") || "application/json",
        "Access-Control-Allow-Origin": "*",
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

export async function OPTIONS() {
  // CORS preflight responder for development. Keep permissive for now.
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
