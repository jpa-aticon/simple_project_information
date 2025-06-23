import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const project = await req.json();

  if (!project.projectId) {
    return NextResponse.json({ error: "Missing projectId" }, { status: 400 });
  }

  // Save to Redis KV using key: project:ID
  await kv.set(`project:${project.projectId}`, project);

  console.log("Saving to Redis:", project.projectId, project);
    
  return NextResponse.json({ ok: true });
}
