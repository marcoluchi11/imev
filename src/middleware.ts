import { NextRequest, NextResponse } from "next/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store: works for single-instance deployments (self-hosted / Railway / etc.)
// For multi-instance / serverless deployments (Vercel), consider an external store (Redis/Upstash)
const rateLimitStore = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 20;  // max requests per IP per window

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) {
    return true;
  }

  entry.count++;
  return false;
}

// Periodically clean up expired entries to avoid memory growth
let lastCleanup = Date.now();
function maybeCleanup() {
  const now = Date.now();
  if (now - lastCleanup > 5 * 60_000) {
    lastCleanup = now;
    rateLimitStore.forEach((entry, key) => {
      if (now > entry.resetAt) rateLimitStore.delete(key);
    });
  }
}

export function middleware(request: NextRequest) {
  maybeCleanup();

  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intentá de nuevo en un momento." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/mercadopago/:path*"],
};
