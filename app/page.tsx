import Header from "../components/header";
import Footer from "../components/footer";
import MemeList from "../components/meme-list";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col  bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <MemeList />
      </main>

      <Footer />
    </div>
  );
}
