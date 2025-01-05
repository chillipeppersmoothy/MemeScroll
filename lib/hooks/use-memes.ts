"use client";

import { useState, useCallback } from 'react';
import type { Meme } from '@/lib/types';

export function useMemes() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMemes = useCallback(async () => {
    try {
      const res = await fetch("https://meme-api.com/gimme/20");
      if (!res.ok) throw new Error('Failed to fetch memes');
      const data = await res.json();
      setMemes((prev) => [...prev, ...data.memes]);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load memes');
      console.error("Error fetching memes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    memes,
    loading,
    error,
    fetchMemes
  };
}