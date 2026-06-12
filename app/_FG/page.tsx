import Image from "next/image";
import Link from "next/link";

const slideshowImages = [
  "/founders-guide/0.png",
  "/founders-guide/1.png",
  "/founders-guide/2.png",
  "/founders-guide/3.png",
  "/founders-guide/4.png",
  "/founders-guide/5.png",
  "/founders-guide/6.png",
  "/founders-guide/7.png",
];

export default function FoundersGuidePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-black">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-3 transition hover:opacity-80"
          >
            <Image src="/logo.png" alt="S8NT AI" width={40} height={40} />

            <span className="text-sm font-bold tracking-[0.3em] text-black">
              S8NT AI
            </span>
          </Link>

          <div className="hidden items-center gap-12 md:flex">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">
              Zero-One
            </span>

            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">
              Build Your Product
            </span>

            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">
              Launch
            </span>
          </div>

          <Link
            href="/api/founders-guide-checkout"
            className="rounded-full bg-orange-500 px-6 py-3 font-bold text-black transition hover:bg-orange-600"
          >
            Buy Now
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="mb-4 inline-block rounded-full bg-orange-100 px-6 py-4 text-3xl font-semibold text-orange-700">
            The Complete AI Founder&apos;s Guide
          </p>

          <h1 className="max-w-3xl text-2xl font-bold tracking-tight md:text-3xl">
            Learn how to build, launch, and sell your AI startup.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-600 md:text-xl">
            A practical founder&apos;s guide for turning an AI idea into a real
            product, getting users, selling offers, and preparing to raise
            money. This book will tell you everything you need to know about
            taking your project from zero-one all in one place!
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/api/founders-guide-checkout"
              className="rounded-full bg-orange-600 px-8 py-4 text-center text-lg font-bold text-white transition hover:bg-orange-700"
            >
              Buy the Ebook
            </Link>

            <a
              href="#whats-inside"
              className="rounded-full border border-black px-8 py-4 text-center text-lg font-bold transition hover:bg-black hover:text-white"
            >
              What&apos;s Inside
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Instant digital delivery after purchase.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-3xl" />

          <Image
            src="/founders-guide/founders%20guide%20moc.png"
            alt="The Complete AI Founder's Guide ebook mockup"
            width={700}
            height={700}
            className="relative z-10 w-full rounded-3xl drop-shadow-2xl"
            priority
          />
        </div>
      </section>

      <section className="relative overflow-hidden py-12">
        <div className="flex w-max animate-founder-marquee gap-6 px-6">
          {[...slideshowImages, ...slideshowImages].map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="h-56 w-56 shrink-0 overflow-hidden rounded-3xl border border-orange-500/30 shadow-2xl"
            >
              <Image
                src={src}
                alt={`Founder guide concept ${index + 1}`}
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section
        id="whats-inside"
        className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20"
      >
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-600">
            What&apos;s Inside
          </p>

          <h2 className="text-4xl font-bold md:text-5xl">
            Everything you need to launch an AI startup
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            From idea validation to fundraising, this guide walks through the
            complete process of building and growing an AI company. Learn how to
            best capitalize on profitable opportunities, validate ideas before
            writing a single line of code, launch your product, and so much
            more. This guide is friendly to everyone, but is especially intended
            for first-time founders. It is an actionable, practical guide that
            provides a roadmap from concept to company.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-3xl border border-orange-500/20 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-2xl">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />

            <h2 className="text-2xl font-bold">Build the Product</h2>

            <p className="mt-4 text-gray-600">
              Understand AI, validate your idea, choose the right business
              structure, build your MVP, and launch your first real product.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-orange-500/20 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-2xl">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />

            <h2 className="text-2xl font-bold">Get Traction</h2>

            <p className="mt-4 text-gray-600">
              Learn how to market your startup, collect emails, acquire users,
              create offers, and generate your first revenue.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-orange-500/20 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-2xl">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />

            <h2 className="text-2xl font-bold">Raise Capital</h2>

            <p className="mt-4 text-gray-600">
              Build a pitch deck, understand venture capital, approach
              investors, and prepare your company for funding opportunities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}