import Container from "../container/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiFillGithub, AiFillYoutube } from "react-icons/ai";
import { FaRss } from "react-icons/fa";
import NewsLetterForm from "./NewsLetterForm";
import ListMenu from "../shared/ListMenu";

export default function Footer() {
  return (
    <Container.Root className="border-t border-slate-200 pb-16 pt-48">
      <Container.Content className="grid grid-cols-1 md:grid-cols-12 lg:gap-x-5">
        <div className="md:col-span-4">
          <p className="text-xl font-medium sm:text-2xl">Dokter Lele</p>
          <p className="mt-6 text-2xl leading-9 text-slate-400">
            Aplikasi diagnosa penyakit ikan lele
          </p>
          <div className="mt-6 flex gap-4">
            <Button variant={"sosial"} size={"social"} asChild>
              <Link target="_blank" href={"https://github.com/FrhCode"}>
                <AiFillGithub size={32} />
              </Link>
            </Button>
            <Button variant={"sosial"} size={"social"} asChild>
              <Link
                target="_blank"
                href={
                  "https://www.youtube.com/channel/UC1X9aVpd9o8SG0hUaWxgdjQ"
                }
              >
                <AiFillYoutube size={32} />
              </Link>
            </Button>
            <Button variant={"sosial"} size={"social"} className="">
              <FaRss size={32} />
            </Button>
          </div>
        </div>
        <div className="mt-20 md:col-span-12 lg:col-span-6 lg:col-start-8 lg:row-start-1 lg:mt-0">
          <p className="text-lg font-medium sm:text-2xl">Tetap up to date</p>
          <p className="mt-3 text-lg text-slate-400">
            Berlangganan buletin untuk mendapatkan informasi terbaru tentang
            pembaharuan, informasi, dan banyak lagi!
          </p>
          <NewsLetterForm />
        </div>
        <div className="mt-20 md:col-span-3 md:col-start-5 md:row-start-1 md:mt-0">
          <p className="text-lg font-medium sm:text-2xl">Kontak</p>
          <ul className="mt-3 flex flex-col items-start gap-1">
            <ListMenu className="text-slate-400 sm:text-lg">
              <Link href={"mailto:farhan7534031b@gmail.com"}>
                Kirimkan Email
              </Link>
            </ListMenu>
            <ListMenu className="text-slate-400 sm:text-lg">
              <Link href={"https://wa.me/6282188513499"} target="_blank">
                Hubungi via Whatsapp
              </Link>
            </ListMenu>
          </ul>
        </div>

        <div className="mt-24 text-slate-400 md:col-span-12 md:mt-44">
          <span>All rights reserved</span>{" "}
          <span className="block md:inline">© Dokter Lele 2023</span>
        </div>
      </Container.Content>
    </Container.Root>
  );
}
