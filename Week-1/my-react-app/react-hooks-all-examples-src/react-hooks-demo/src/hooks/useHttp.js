import { useState } from "react";

export default function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendRequest(url, options = {}) {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "";

      return contentType.includes("application/json")
        ? await response.json()
        : await response.text();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { sendRequest, loading, error };
}
