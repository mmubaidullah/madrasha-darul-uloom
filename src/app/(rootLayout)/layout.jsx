import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function RootLayout({ children }) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar/>
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}