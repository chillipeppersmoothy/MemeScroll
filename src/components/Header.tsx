import { Laugh } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Laugh className="h-8 w-8 text-indigo-500 dark:text-indigo-400 animate-bounce" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
              MemeScroll
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
