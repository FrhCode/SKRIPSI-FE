import Container from "@/components/container/Container";
import LoginForm from "./components/LoginForm";
import leleIcon from "@/public/image-260nw-2278720581.png";
import Image from "next/image";
import Header from "@/components/header/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function page() {
  const data = await getServerSession(authOptions);

  if (data) {
    redirect("/dashboard");
  }

  return (
    <>
      <Header />
      <Container.Root>
        <Container.Content className="mt-20 flex justify-center">
          <div className="space-y-10">
            <div className="flex flex-col items-center space-y-5">
              <div className="relative h-16 w-16">
                <Image
                  src={leleIcon}
                  fill
                  style={{ objectFit: "cover" }}
                  alt="lele icon"
                />
              </div>
              <p className="text-center text-4xl font-semibold">
                Login ke Dokter Lele
              </p>
            </div>
            <LoginForm />
          </div>
        </Container.Content>
      </Container.Root>
    </>
  );
}
