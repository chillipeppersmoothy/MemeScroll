import { useCallback, useState } from "react";
import { Meme, MemeResponse } from "../types/meme";

export function useMemes() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchMemes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://meme-api.com/gimme/20");
      if (!response.ok) throw new Error("Failed to fetch memes");

      const data: MemeResponse = await response.json();
      setMemes((prevMemes) => [...prevMemes, ...data.memes]);
      setHasMore(data.memes.length > 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load memes");
    } finally {
      setLoading(false);
    }
  }, []);

  return { memes, loading, error, hasMore, fetchMemes };
}
