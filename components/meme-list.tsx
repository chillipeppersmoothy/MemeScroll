"use client";

import { useEffect } from "react";
import LoadingIicon from "../components/loading-icon";
import { MemeCard } from "@/components/meme-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMemes } from "@/lib/hooks/use-memes";
import { useInView } from "react-intersection-observer";

export default function MemeList() {
  const { memes, loading, error, fetchMemes } = useMemes();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchMemes();
    }
  }, [inView, fetchMemes]);

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {memes.map((meme, index) => (
          <MemeCard meme={meme} key={`${meme.url}-${index}`} />
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
