import { isAuthenticated } from "@/actions/auth";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    isAuthenticated: isAuthenticated(),
  });
}
