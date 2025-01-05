import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>for meme lovers!</span>
          </div>
          <p>by Aditya Shenoy K</p>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} MemeScroll. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
