import { get_data } from "@/utils/get_data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await get_data(4);
  return NextResponse.json(data);
}
