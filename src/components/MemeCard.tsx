import { ExternalLink, ThumbsUp } from "lucide-react";
import { Meme } from "../types/meme";

interface MemeCardProps {
  meme: Meme;
}

export function MemeCard({ meme }: MemeCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-200">
      <div className="p-3">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>r/{meme.subreddit}</span>
          <span>by {meme.author}</span>
        </div>
      </div>

      <div className="relative bg-gray-100 dark:bg-gray-700">
        <img
          src={meme.url}
          alt={meme.title}
          height={1000}
          width={1000}
          className="w-full h-auto max-h-[600px] object-contain"
          loading="lazy"
        />
      </div>

      <div className="p-3 space-y-2">
        <h2 className="text-base text-gray-800 dark:text-white">
          {meme.title}
        </h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <ThumbsUp className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            <span className="font-medium">{meme.ups.toLocaleString()}</span>
          </div>
          <a
            href={meme.postLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300"
          >
            <span>Reddit</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
