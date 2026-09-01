import { db } from "@/db";
import { WhiteBoardData } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { projectId, elements, files, appState } = await req.json();

    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized user" },
        { status: 401 }
      );
    }

    if (!projectId) {
      return NextResponse.json(
        { error: "Project information missing!" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(WhiteBoardData)
      .values({
        projectId,
        elements,
        appState,
        files,
      })
      .onConflictDoUpdate({
        target: WhiteBoardData.projectId,
        set: {
          elements,
          appState,
          files,
          updatedAt: new Date(),
        },
      })
      .returning();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Whiteboard save error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}