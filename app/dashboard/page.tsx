import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const data = await getServerSession(authOptions);

  return (
    <>
      <pre>{JSON.stringify(data)}</pre>
			<Button asChild>
				<Link href={"/dashboard/user"}>user</Link>
			</Button>
      <form action="/api/auth/signout" method="post">
        <Button variant={"destructive"}>Log out</Button>
      </form>
    </>
  );
}
