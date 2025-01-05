import { useCallback, useRef, useEffect } from 'react';
import { useMemes } from './useMemes';

export function useMemeInfiniteScroll() {
  const { memes, loading, error, hasMore, fetchMemes } = useMemes();
  const observer = useRef<IntersectionObserver>();

  // Initial fetch when component mounts
  useEffect(() => {
    fetchMemes();
  }, [fetchMemes]);

  const lastMemeRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchMemes();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, fetchMemes]);

  return {
    memes,
    loading,
    error,
    lastMemeRef
  };
}