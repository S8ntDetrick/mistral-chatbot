'use client';

import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const slideshowImages = [
    '/slideshow/1.png',
    '/slideshow/2.jpg',
    '/slideshow/3.jpg',
    '/slideshow/4.png',
    '/slideshow/5.jpg',
    '/slideshow/6.jpg',
    '/slideshow/7.png',
  ];

  const scrollingImages = [...slideshowImages, ...slideshowImages];

  const handleWaitlistClick = () => {
    if (isSignedIn) {
      router.push('/waitlist');
    } else {
      router.push('/signup?redirect_url=/waitlist');
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#050505] via-[#0f172a] to-black text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="S8NT AI Logo" width={42} height={42} />
          <span className="text-xs font-bold tracking-[0.18em] sm:text-sm sm:tracking-[0.25em]">
            S8NT AI
          </span>
        </div>

        <div className="hidden gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-gray-300 md:flex">
          <span>Research</span>
          <span>Culture</span>
          <span>Writing</span>
          <span>Business</span>
        </div>

        <button
          onClick={handleWaitlistClick}
          className="shrink-0 rounded-full bg-[#F59E0B] px-4 py-2 text-xs font-extrabold text-black sm:px-5 sm:text-sm"
        >
          Get Access
        </button>
      </nav>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 md:gap-10 md:py-16">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F59E0B] sm:text-sm sm:tracking-[0.3em]">
            AI You Can Trust
          </p>

          <h1 className="max-w-xl text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            Stop Settling for Generic and Biased AI Tools
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-gray-300 sm:mt-6 sm:text-lg sm:leading-8">
            S8NT AI is built for deeper inquiry — helping users explore REAL
            history, culture, and complex ideas — while also providing practical
            tools for writing, communication, and business use. Most
            importantly, it isn&apos;t programmed to lie to you like other
            platforms.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <button
              onClick={handleWaitlistClick}
              className="w-full rounded-full bg-[#F59E0B] px-6 py-4 text-center font-extrabold text-black hover:bg-[#fbbf24] sm:w-auto sm:px-8"
            >
              Get Free Access
            </button>

            <a
              href="#use-cases"
              className="w-full rounded-full border border-white/20 px-6 py-4 text-center font-bold text-white hover:bg-white/10 sm:w-auto sm:px-8"
            >
              See What It Does
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-[430px] overflow-hidden rounded-3xl shadow-2xl">
            <div className="sm:-mt-20">
              <Image
                src="/chat-example.png"
                alt="Example of S8NT AI chatbot"
                width={430}
                height={320}
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden py-8">
        <div className="flex w-max animate-scroll gap-4 sm:gap-6">
          {scrollingImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="h-[180px] w-[240px] flex-shrink-0 overflow-hidden rounded-2xl bg-black shadow-2xl sm:h-[260px] sm:w-[340px] sm:rounded-3xl"
            >
              <Image
                src={src}
                alt={`S8NT AI visual ${index + 1}`}
                width={340}
                height={260}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {['Real History', 'Deep Research', 'Business Copy', 'Better Answers'].map(
            (item) => (
              <div
                key={item}
                className="rounded-xl bg-black/70 px-4 py-4 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-lg sm:px-5 sm:text-xs sm:tracking-[0.18em]"
              >
                {item}
              </div>
            )
          )}
        </div>
      </section>

      <section
        id="use-cases"
        className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-10 md:py-14"
      >
        <div className="flex justify-center md:order-2">
          <Image
            src="/web-copy.png"
            alt="S8NT AI Website Copy Example"
            width={430}
            height={330}
            className="w-full max-w-[430px] rounded-3xl shadow-2xl"
          />
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F59E0B] sm:text-sm sm:tracking-[0.3em]">
            From Research to Real-World Use
          </p>

          <h2 className="text-3xl font-black leading-tight sm:text-4xl">
            Turn Knowledge Into Output
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
            S8NT AI isn&apos;t just for exploring ideas — it helps you apply
            them. Generate website copy, refine messaging, and turn knowledge
            into real business output.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'What It Is',
              text: 'An AI-powered research and discovery platform built around curated historical, cultural, and educational material.',
            },
            {
              title: 'Why It Matters',
              text: 'Most AI tools are broad and generic. S8NT AI is being built with a more intentional focus, clearer context, and deeper cultural relevance.',
            },
            {
              title: 'From Insight to Business Execution',
              text: 'S8NT AI bridges the gap between learning and application — turning information into usable output for business, writing, and communication.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6 shadow-xl sm:p-8"
            >
              <h2 className="text-2xl font-black">{item.title}</h2>
              <div className="my-5 h-[2px] w-20 bg-[#F59E0B]" />
              <p className="leading-7 text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="text-3xl font-black sm:text-4xl">Get Free Access</h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
          Be among the first to access S8NT AI and stay updated on the launch.
        </p>

        <button
          onClick={handleWaitlistClick}
          className="mt-8 w-full rounded-full bg-[#F59E0B] px-8 py-4 font-extrabold text-black hover:bg-[#fbbf24] sm:w-auto sm:px-10"
        >
          Get Free Access
        </button>
      </section>
    </main>
  );
}