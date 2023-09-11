import Header from "./components/Header";
import Jumbotron from "./components/Jumbotron";

export default function Home() {
  return (
    <>
      <Header />
      <Jumbotron />
      <div className="h-10"></div>
      <div className="px-[5vw] py-11">
        <div className="mx-auto max-w-7xl rounded-md bg-gray-100 p-16">
          <div className="grid w-full grid-cols-12 gap-8 lg:gap-4">
            <p className="col-span-6 text-4xl leading-snug lg:col-span-12">
              Kesulitan dalam mengenali penyakit yang menyerang ikan lele anda?
            </p>
            <p className="col-span-6 col-start-7 text-4xl leading-snug text-gray-400 lg:col-span-12">
              Kebetulan, Anda berada ditempat yang tepat. Dokter lele merupakan
              satu-satunya platform yang anda butuhkan untuk menyelesaikan
              masalah anda.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
