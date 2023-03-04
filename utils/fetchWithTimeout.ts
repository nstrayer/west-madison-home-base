export async function fetchWithTimeout(
  resource: string,
  fetch_options: Parameters<typeof fetch>[1],
  timeout_ms: number = 3000
) {
  console.log("Running timeout fetch");
  const controller = new AbortController();
  const id = setTimeout(() => {
    controller.abort("Timeout");
  }, timeout_ms);
  const response = await fetch(resource, {
    ...fetch_options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}
