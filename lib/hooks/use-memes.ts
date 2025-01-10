"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import type { Meme } from '@/lib/types';

const BATCH_SIZE = 20;
const CACHE_KEY = 'memes_cache';
const CACHE_EXPIRY = 1000 * 60 * 5; // 5 minutes

export function useMemes() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchingRef = useRef(false);

  // Load cached memes after mount
  useEffect(() => {
    const loadCachedMemes = () => {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_EXPIRY) {
            setMemes(data);
            return;
          }
          localStorage.removeItem(CACHE_KEY);
        } catch (error) {
          console.error('Error loading cached memes:', error);
          localStorage.removeItem(CACHE_KEY);
        }
      }
    };

    loadCachedMemes();
  }, []);

  const fetchMemes = useCallback(async () => {
    if (fetchingRef.current) return;
    
    try {
      fetchingRef.current = true;
      setLoading(true);
      
      const res = await fetch(`https://meme-api.com/gimme/${BATCH_SIZE}`);
      if (!res.ok) throw new Error('Failed to fetch memes');
      const data = await res.json();
      
      // Filter out potentially broken images or invalid URLs
      const validMemes = data.memes.filter((meme: Meme) => {
        try {
          const url = new URL(meme.url);
          return url.protocol === 'https:' && !meme.nsfw;
        } catch {
          return false;
        }
      });
      
      setMemes((prev) => {
        const newMemes = [...prev, ...validMemes];
        // Cache the memes
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: newMemes,
            timestamp: Date.now()
          }));
        } catch (error) {
          console.error('Error caching memes:', error);
        }
        return newMemes;
      });
      
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