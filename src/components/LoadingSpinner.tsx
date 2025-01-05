import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center p-4">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
    </div>
  );
}