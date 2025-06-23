import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest } from "next";

export async function GET(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  const id = context.params.id;
  const project = await kv.get(`project:${id}`);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}
