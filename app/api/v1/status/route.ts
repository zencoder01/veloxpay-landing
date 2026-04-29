import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { env } from "@/lib/veloxpay/env";

export async function GET() {
  const started = Date.now();
  let dbOk = true;
  try {
    await db.$queryRaw`SELECT 1`;
  } catch {
    dbOk = false;
  }
  const latencyMs = Date.now() - started;

  return NextResponse.json({
    service: "veloxpay-api",
    environment: env.pocMode ? "poc-sandbox" : "live",
    healthy: dbOk,
    checks: {
      database: dbOk ? "ok" : "failed",
    },
    latencyMs,
    timestamp: new Date().toISOString(),
  });
}
