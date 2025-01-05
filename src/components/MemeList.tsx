import { useMemeInfiniteScroll } from '../hooks/useMemeInfiniteScroll';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';
import { MemeCard } from './MemeCard';

export function MemeList() {
  const { memes, loading, error, lastMemeRef } = useMemeInfiniteScroll();

  return (
    <main className="flex-grow container mx-auto px-4 py-6">
      {error && <ErrorMessage message={error} />}
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {memes.map((meme, index) => (
          <div
            key={`${meme.url}-${index}`}
            ref={index === memes.length - 1 ? lastMemeRef : undefined}
          >
            <MemeCard meme={meme} />
          </div>
        ))}
      </div>
      
      {loading && <LoadingSpinner />}
      
      {!loading && memes.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
          No memes available.
        </p>
      )}
    </main>
  );
}