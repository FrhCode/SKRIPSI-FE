import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const data = await getServerSession(authOptions);

  return (
    <>
      <pre>{JSON.stringify(data)}</pre>
      <form action="/api/auth/signout" method="post">
        <Button variant={"destructive"}>Log out</Button>
      </form>
    </>
  );
}
