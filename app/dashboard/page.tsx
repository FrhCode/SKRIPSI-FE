import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { headers } from "next/headers";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineDashboard, AiOutlineInbox } from "react-icons/ai";
import { BiCubeAlt, BiDetail } from "react-icons/bi";
import { BsWindowDock } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LogOutComponent from "@/components/shared/LogOutComponent";

export default async function Page() {
  const headersList = headers();
  const path = headersList.get("x-url") || "";

  const { pathname } = new URL(path);

  return (
    <div className="flex h-screen">
      <div className="hidden w-80 flex-shrink-0"></div>
      <div className="grid flex-grow grid-cols-1 content-start gap-4 p-4">
        <Card className="rounded">
          <CardContent className="flex h-14 items-center py-0">
            <Sheet>
              <SheetTrigger>
                <div>
                  <GiHamburgerMenu color="var(--blue-600)" size={23} />
                </div>
              </SheetTrigger>
              <SheetContent side={"left"}>
                <div className="mb-5"></div>
                <ul className="space-y-5">
                  <li
                    className={cn(
                      clsx("flex items-center gap-2", {
                        "text-blue-600": "/dashboard" === pathname,
                      })
                    )}
                  >
                    <AiOutlineDashboard />
                    <p>Dashboard</p>
                  </li>
                  <li
                    className={cn(
                      clsx("flex items-center gap-2", {
                        "text-blue-600": "/aa" === pathname,
                      })
                    )}
                  >
                    <AiOutlineInbox />
                    <p>Penyakit</p>
                  </li>
                  <li
                    className={cn(
                      clsx("flex items-center gap-2", {
                        "text-blue-600": "/a" === pathname,
                      })
                    )}
                  >
                    <BsWindowDock />
                    <p>Gejala</p>
                  </li>
                  <li
                    className={cn(
                      clsx("flex items-center gap-2", {
                        "text-blue-600": "/f" === pathname,
                      })
                    )}
                  >
                    <BiCubeAlt />
                    <p>Basis Pengetahuan</p>
                  </li>
                  <li
                    className={cn(
                      clsx("flex items-center gap-2", {
                        "text-blue-600": "/v" === pathname,
                      })
                    )}
                  >
                    <BiDetail />
                    <p>Hasil Konsultasi</p>
                  </li>
                  <li
                    className={cn(
                      clsx("flex items-center gap-2", {
                        "text-blue-600": "/b" === pathname,
                      })
                    )}
                  >
                    <CgLogOut />
                    <LogOutComponent>Logout</LogOutComponent>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </CardContent>
        </Card>

        <Card className="rounded">
          <CardHeader>
            <CardTitle>
              Selamat datang <span className="text-blue-600">admin</span>
            </CardTitle>
            <CardDescription>
              Aplikasi diagnosa penyakit ikan lele
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <p>
              Sistem pakar secara otomatis mendiagnosa penyakit yang diderita
              oleh ikan berdasarkan basis pengetahuan dari pakar.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
