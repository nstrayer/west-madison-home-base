import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { hours: string } }
) {
  const num_hours = Number(params.hours) ?? 1;
  // Cache data but not for too long
  const res = await fetch(`http://100.108.62.129:8888/data/${num_hours}`, {
    cache: "no-store",
  });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return NextResponse.json(data);
}
