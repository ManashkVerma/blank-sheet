import { db } from "@/db";
import { WhiteBoardData, projects } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { projectId, elements, files, appState, thumbnail } = await req.json();

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

    if (thumbnail) {
      await db
        .update(projects)
        .set({ thumbnail })
        .where(eq(projects.projectId, projectId));
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Whiteboard save error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}