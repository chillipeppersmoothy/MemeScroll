import { Loader2 } from "lucide-react";

export function LoadingIicon() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center justify-center space-y-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Loading more memes...</span>
        <p>by Aditya Shenoy K</p>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} MemeScroll. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LoadingIicon;
