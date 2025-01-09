import { Card } from '@/components/ui/card';
import { Meme } from '@/lib/types';
import { ExternalLink, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

export function MemeCard({ meme }: { meme: Meme }) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Card className="overflow-hidden transition-all group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg transform hover:scale-[1.05] duration-200">
      <div className="p-4 space-y-2 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span className="text-sm font-medium text-red-400">
            r/{meme.subreddit}
          </span>
          <span className="text-sm text-muted-foreground">u/{meme.author}</span>
        </div>
      </div>

      <div className="relative aspect-[4/3]">
        {imageLoading && (
          <Skeleton className="absolute inset-0 bg-gray-200 dark:bg-gray-700" />
        )}
        <Image
          src={meme.url}
          alt={meme.title}
          fill
          className={`object-contain bg-black/5 dark:bg-white/5 transition-opacity duration-200 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          loading="lazy"
          onLoadingComplete={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
      </div>

      <div className="p-3 space-y-2 bg-white dark:bg-gray-800">
        <h2 className="text-base text-gray-800 dark:text-white line-clamp-2">
          {meme.title}
        </h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <ThumbsUp className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            <span className="font-medium">{meme.ups.toLocaleString()}</span>
          </div>
          <Link
            href={meme.postLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Reddit</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
