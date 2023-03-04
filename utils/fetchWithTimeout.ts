export async function fetchWithTimeout(
  resource: string,
  fetch_options: Parameters<typeof fetch>[1],
  timeout_ms: number = 3000
) {
  const controller = new AbortController();
  const id = setTimeout(() => {
    controller.abort("Timeout");
  }, timeout_ms);

  try {
    const response = await fetch(resource, {
      ...fetch_options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    if (!(err instanceof Error)) {
      throw Error("Unknown error happened in fetch...");
    }
    if (err.name == "AbortError") {
      console.log({ cause: err.cause, message: err.message });
      throw new Error(`Database request timed out after ${timeout_ms}ms.`);
    }
    throw err;
  }
}
