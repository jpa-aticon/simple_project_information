import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  // 받은 데이터를 그대로 반환
  return NextResponse.json(data);
}