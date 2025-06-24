import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data.projectId) {
    return NextResponse.json({ error: "Missing projectId" }, { status: 400 });
  }

  const { error } = await supabase
    .from("projects")
    .upsert({
      id: data.projectId,
      project_name: data.projectName,
      project_address: data.projectAddress,
      client_name: data.clientName,
      client_address: data.clientAddress,
      deadline: data.deadline,
    });

  if (error) {
    console.error("Supabase error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
