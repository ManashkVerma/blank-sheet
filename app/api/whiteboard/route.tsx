import { db, WhiteBoardData } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  const { projectId, elements, files, appState } = await req.json();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("unauthorized User");
  }

  if (projectId) {
    try {
      const result = await db
        .insert(WhiteBoardData)
        .values({
          projectId: projectId,
          elements: elements,
          appState: appState,
          files: files,
        })
        .onConflictDoUpdate({
          target: WhiteBoardData.projectId,
          set: {
            elements: elements,
            appState: appState,
            files: files,
            updatedAt: new Date(),
          },
        });
      return NextResponse.json(result);
    } catch (e) {
      console.log("Internal server error");
    }
  }

  return NextResponse.json("Project information missing!");
}
