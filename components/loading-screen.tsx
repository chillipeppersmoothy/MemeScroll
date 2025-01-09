'use client';

import { Laugh } from 'lucide-react';
import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <Laugh className="h-16 w-16 text-indigo-500 dark:text-indigo-400 animate-[scale_1s_ease-in-out]" />
        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
          MemeScroll
        </div>
        <p>by Aditya Shenoy K</p>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} MemeScroll. All rights reserved.
        </p>
      </div>
    </div>
  );
}
