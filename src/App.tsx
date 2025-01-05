import { ThemeProvider } from "./contexts/ThemeContext";
import { MemeList } from "./components/MemeList";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        <Header />
        <MemeList />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
