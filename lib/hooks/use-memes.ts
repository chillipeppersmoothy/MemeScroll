"use client";

import { useState, useCallback, useRef } from 'react';
import type { Meme } from '@/lib/types';

export function useMemes() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchingRef = useRef(false);

  const fetchMemes = useCallback(async () => {
    // Prevent multiple simultaneous requests
    if (fetchingRef.current) return;
    
    try {
      fetchingRef.current = true;
      setLoading(true);
      
      const res = await fetch("https://meme-api.com/gimme/20");
      if (!res.ok) throw new Error('Failed to fetch memes');
      const data = await res.json();
      
      // Filter out potentially broken images or invalid URLs
      const validMemes = data.memes.filter((meme: Meme) => {
        const url = new URL(meme.url);
        return url.protocol === 'https:' && !meme.nsfw;
      });
      
      setMemes((prev) => [...prev, ...validMemes]);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load memes');
      console.error("Error fetching memes:", error);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, []);

  return {
    memes,
    loading,
    error,
    fetchMemes
  };
}