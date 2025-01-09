import { Loader2 } from 'lucide-react';

export function LoadingIicon() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center justify-center space-y-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Loading more memes...</span>
      </div>
    </div>
  );
}

export default LoadingIicon;
