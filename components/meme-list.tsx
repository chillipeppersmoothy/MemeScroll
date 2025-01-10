'use client';

import { useEffect, useState } from 'react';
import LoadingIicon from '../components/loading-icon';
import { MemeCard } from '@/components/meme-card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useMemes } from '@/lib/hooks/use-memes';
import { useInView } from 'react-intersection-observer';

export default function MemeList() {
  const { memes, loading, error, fetchMemes } = useMemes();
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: '100px',
  });
  const [mounted, setMounted] = useState(false);

  // Handle mounting state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch initial memes when component mounts
  useEffect(() => {
    if (mounted) {
      fetchMemes();
    }
  }, [mounted, fetchMemes]);

  // Fetch more memes when scrolling to bottom
  useEffect(() => {
    if (inView && mounted) {
      fetchMemes();
    }
  }, [inView, fetchMemes, mounted]);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max">
        {memes.map((meme, index) => (
          <MemeCard 
            meme={meme} 
            key={`${meme.url}-${index}`}
            priority={index < 6} // Prioritize loading first 6 images
          />
        ))}
      </div>

      <div ref={ref} className="flex justify-center py-8">
        {loading && <LoadingIicon />}

        {!loading && memes.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
            No memes available.
          </p>
        )}
      </div>
    </>
  );
}