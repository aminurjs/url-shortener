// app/api/check-auth/route.ts
import { getActiveUser } from "@/actions/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getActiveUser();

    if (user) {
      return NextResponse.json({
        isAuthenticated: true,
        user: {
          user,
        },
      });
    }

    return NextResponse.json({
      isAuthenticated: false,
      user: null,
    });
  } catch (error) {
    console.error("Authentication check error:", error);
    return NextResponse.json(
      {
        isAuthenticated: false,
        user: null,
      },
      { status: 500 }
    );
  }
}
