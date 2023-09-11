import Container from "../components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Jumbotron from "./components/Jumbotron";

export default function Home() {
  return (
    <>
      <Header />
      <Jumbotron />
      <div className="h-10"></div>
      <Container.Root className="py-11">
        <Container.Content className="rounded-md bg-gray-100 py-16">
          <div className="grid w-full grid-cols-12 gap-4 lg:gap-8">
            <p className="col-span-12 text-3xl leading-normal sm:text-4xl sm:leading-relaxed lg:col-span-6">
              Kesulitan mengenali penyakit pada ikan lele anda?
            </p>
            <p className="col-span-12 text-3xl leading-normal text-gray-400 sm:text-4xl sm:leading-relaxed lg:col-span-6">
              Anda berada ditempat yang tepat. Dokter lele merupakan platform
              untuk menyelesaikan masalah anda.
            </p>
          </div>
        </Container.Content>
      </Container.Root>
      <div className="h-40 lg:h-48"></div>
      <Footer />
    </>
  );
}
