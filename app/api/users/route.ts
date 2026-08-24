import { db, users } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 401 }
      );
    }

    const email = user.primaryEmailAddress?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { message: "User email not found" },
        { status: 400 }
      );
    }

    const user_data = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (user_data.length > 0) {
      return NextResponse.json(user_data[0], { status: 200 });
    }

    const result = await db
      .insert(users)
      .values({
        name: user.fullName,
        email,
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/users failed:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}