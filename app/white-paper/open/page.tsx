import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OpenWhitePaperPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/signup?redirect_url=/white-paper/open");
  }

  return (
    <main className="h-screen w-full bg-black">
      <iframe
        src="/whitepaper.pdf"
        className="h-full w-full"
      />
    </main>
  );
}