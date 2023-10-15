import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineDashboard, AiOutlineInbox } from "react-icons/ai";
import { BsWindowDock } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import LogOutComponent from "@/components/shared/LogOutComponent";
import { CgLogOut } from "react-icons/cg";
import Menu from "./components/Menu";
import MiniNav from "./components/MiniNav";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import NullSessionException from "@/exception/NullSessionException";

export default async function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("NO SESSION");

    throw new NullSessionException();
  }

  // const headersList = headers();
  // const path = headersList.get("x-url") || "";
  // const { pathname } = new URL(path);

  const menus: Array<{
    id: string;
    content: string | JSX.Element;
    pathname: string;
    icon: JSX.Element;
    isNotLink?: boolean;
  }> = [
    {
      id: "Dashboard",
      content: "Dashboard",
      pathname: "/dashboard",
      icon: <AiOutlineDashboard />,
    },
    {
      id: "Penyakit",
      content: "Penyakit",
      pathname: "/dashboard/diese",
      icon: <AiOutlineInbox />,
    },
    {
      id: "Gejala",
      content: "Gejala",
      pathname: "/dashboard/symptom",
      icon: <BsWindowDock />,
    },
    {
      id: "Hasil Konsultasi",
      content: "Hasil Konsultasi",
      pathname: "/dashboard/consultation",
      icon: <BiDetail />,
    },
    {
      id: "Kelola Akun",
      content: "Kelola Akun",
      pathname: "/dashboard/user",
      icon: <FaRegUserCircle />,
    },
    {
      id: "Logout",
      content: <LogOutComponent>Logout</LogOutComponent>,
      pathname: "/a",
      icon: <CgLogOut />,
      isNotLink: true,
    },
  ];

  return (
    <div className="flex">
      <div className="hidden h-screen w-60 flex-shrink-0 py-4 shadow lg:block">
        <Link href={"/"}>
          <span className="flex h-14 items-center px-4 text-2xl font-black text-blue-600">
            Dokter Lele
          </span>
        </Link>
        <ul className="flex flex-col gap-4">
          <Menu menus={menus} />
        </ul>
      </div>
      <div className="relative h-full max-h-screen flex-grow overflow-y-auto p-4 pb-20">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 content-start gap-4">
          <Card className="rounded shadow-sm">
            <CardContent className="flex h-14 items-center py-0">
              <Sheet>
                <SheetTrigger className="lg:hidden">
                  <div>
                    <GiHamburgerMenu color="var(--blue-600)" size={23} />
                  </div>
                </SheetTrigger>
                <SheetContent side={"left"}>
                  <div className="mb-5"></div>
                  <ul className="space-y-5">
                    <MiniNav menus={menus} />
                  </ul>
                </SheetContent>
              </Sheet>
              <span className="hidden text-lg font-semibold lg:block">
                Dashboard
              </span>
            </CardContent>
          </Card>

          {children}
        </div>
      </div>
    </div>
  );
}
