import { ErrorMessageProps } from "../types/meme";

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="text-center text-red-600 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/50 rounded-lg mb-4">
      {message}
    </div>
  );
}
