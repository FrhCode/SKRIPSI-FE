import Container from "../components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Jumbotron from "./components/Jumbotron";

export default function Home() {
  return (
    <>
      <Header />
      <Jumbotron />
      <Container.Root className="py-11">
        <Container.Content className="rounded-md bg-slate-100 py-16">
          <div className="grid w-full grid-cols-12 gap-4 lg:gap-8">
            <p className="col-span-12 text-3xl leading-normal sm:text-4xl sm:leading-relaxed lg:col-span-6">
              Kesulitan mengenali penyakit pada ikan lele anda?
            </p>
            <p className="col-span-12 text-3xl leading-normal text-slate-400 sm:text-4xl sm:leading-relaxed lg:col-span-6">
              Anda berada ditempat yang tepat. Dokter lele merupakan platform
              untuk menyelesaikan masalah anda.
            </p>
          </div>
        </Container.Content>
      </Container.Root>

      <Container.Root>
        <Container.Content>
          <p className="border-b border-dotted border-slate-400 pb-2 text-center text-2xl font-light leading-loose">
            Dengan 3 langkah mudah
          </p>
          <ul className="mt-5 flex flex-col gap-5 lg:mt-8 lg:flex-row">
            <li className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-slate-200 font-medium">
                1
              </div>
              <div className="flex flex-col gap-1">
                <p className="">Memilih menu mulai konsultasi</p>
                <p className="text-slate-400">
                  Memulai diagnosa pada aplikasi Dokter Lele sangatlah mudah dan
                  gratis
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-slate-200 font-medium">
                2
              </div>
              <div className="flex flex-col gap-1">
                <p className="">Mengisi form konsultasi</p>
                <p className="text-slate-400">
                  Mulai isi form konsultasi, berdasarkan gejala yang anda lihat
                  pada ikan lele anda
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-slate-200 font-medium">
                3
              </div>
              <div className="flex flex-col gap-1">
                <p className="">Mengunduh hasil konsultasi</p>
                <p className="text-slate-400">
                  Setelah selesai mengisi form konsultasi, anda dapat melihat
                  hasil konsultasi, sekaligus mengunduh hasil konsultasi
                </p>
              </div>
            </li>
          </ul>
          <div className="mt-8 flex justify-center">
            <button className="rounded-full bg-black px-7 py-6 font-medium text-white transition active:scale-[97%] active:bg-slate-950">
              Mulai Konsultasi
            </button>
          </div>
        </Container.Content>
      </Container.Root>
      <div className="h-40 lg:h-48"></div>
      <Footer />
    </>
  );
}
