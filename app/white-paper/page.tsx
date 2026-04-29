import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function WhitePaperPage() {
  const { userId } = await auth();

  const openUrl = userId
    ? "/white-paper/open"
    : "/signup?redirect_url=%2Fwhite-paper%2Fopen";

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-widest text-gray-400">
          S8NT™ Whitepaper
        </p>

        <h1 className="mt-4 text-4xl md:text-6xl font-bold">
          The Future of Specialized AI Knowledge
        </h1>

        <p className="mt-6 text-lg text-gray-300">
          A deeper look at S8NT™, its market opportunity, defensibility,
          monetization model, and long-term vision.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
          <div className="aspect-[8.5/11] mx-auto max-w-md rounded-xl bg-white text-black p-10 flex flex-col justify-between">
            <div>
              <p className="text-sm tracking-widest uppercase">S8NT™</p>
              <h2 className="mt-10 text-3xl font-bold leading-tight">
                Whitepaper
              </h2>
              <p className="mt-4 text-gray-700">
                Specialized AI for history, theology, culture, and identity.
              </p>
            </div>

            <p className="text-sm text-gray-500">s8nt.ai</p>
          </div>
        </div>

        <Link
          href={openUrl}
          className="mt-10 inline-flex rounded-full bg-white px-8 py-4 font-semibold text-black hover:bg-gray-200"
        >
          Open Whitepaper
        </Link>
      </div>
    </main>
  );
}