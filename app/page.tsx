import Header from "./components/Header";
import Jumbotron from "./components/Jumbotron";

export default function Home() {
  return (
    <>
      <Header />
      <Jumbotron />
      <div className="h-10"></div>
      <div className="px-[5vw] py-11">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-md bg-gray-100 px-10 py-16">
          HI
        </div>
      </div>
    </>
  );
}
