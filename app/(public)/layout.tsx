import Footer from "@/Components/footer/Footer";
import Header from "@/Components/header/Header";

export default function publicLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <div className="h-40 lg:h-48"></div>
      <Footer />
    </>
  );
}
