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
          <div className="grid w-full grid-cols-12">
            <p className="col-span-5 text-4xl leading-snug">
              Having a hard time keeping up with JavaScript?
            </p>
            <p className="col-span-5 col-start-7 text-4xl leading-snug text-gray-400">
              Having a hard time keeping up with JavaScript?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
