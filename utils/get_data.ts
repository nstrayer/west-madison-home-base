import { fetchWithTimeout } from "./fetchWithTimeout";

export async function get_data(num_hours: number): Promise<string[]> {
  // Cache data but not for too long
  const res = await fetchWithTimeout(
    `http://100.108.62.129:8888/data/${num_hours}`,
    {
      cache: "no-store",
    }
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
