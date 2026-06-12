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
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="S8NT AI Logo" width={42} height={42} />
          <span className="text-sm font-bold tracking-[0.25em]">S8NT AI</span>
        </div>

        <div className="hidden gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-gray-300 md:flex">
          <span>Research</span>
          <span>Culture</span>
          <span>Writing</span>
          <span>Business</span>
        </div>

        <button
          onClick={handleWaitlistClick}
          className="rounded-full bg-[#F59E0B] px-5 py-2 text-sm font-extrabold text-black"
        >
          Get Access
        </button>
      </nav>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:grid-cols-2 md:py-16">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#F59E0B]">
            AI You Can Trust
          </p>

          <h1 className="max-w-xl text-5xl font-black leading-tight md:text-6xl">
            Stop Settling for Generic and Biased AI Tools
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
            S8NT AI is built for deeper inquiry — helping users explore REAL
            history, culture, and complex ideas — while also providing practical
            tools for writing, communication, and business use. Most
            importantly, it isn&apos;t programmed to lie to you like other
            platforms.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={handleWaitlistClick}
              className="rounded-full bg-[#F59E0B] px-8 py-4 font-extrabold text-black hover:bg-[#fbbf24]"
            >
              Get Free Access
            </button>

            <a
              href="#use-cases"
              className="rounded-full border border-white/20 px-8 py-4 font-bold text-white hover:bg-white/10"
            >
              See What It Does
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-[430px] max-w-full overflow-hidden rounded-3xl shadow-2xl">
            <div className="-mt-20">
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
        <div className="flex w-max gap-6 animate-scroll">
          {scrollingImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="h-[260px] w-[340px] flex-shrink-0 overflow-hidden rounded-3xl bg-black shadow-2xl"
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

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {['Real History', 'Deep Research', 'Business Copy', 'Better Answers'].map(
            (item) => (
              <div
                key={item}
                className="rounded-xl bg-black/70 px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg"
              >
                {item}
              </div>
            )
          )}
        </div>
      </section>

      <section
        id="use-cases"
        className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-2"
      >
        <div className="flex justify-center md:order-2">
          <Image
            src="/web-copy.png"
            alt="S8NT AI Website Copy Example"
            width={430}
            height={330}
            className="rounded-3xl shadow-2xl"
          />
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#F59E0B]">
            From Research to Real-World Use
          </p>

          <h2 className="text-4xl font-black leading-tight">
            Turn Knowledge Into Output
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-8 text-gray-300">
            S8NT AI isn’t just for exploring ideas — it helps you apply them.
            Generate website copy, refine messaging, and turn knowledge into
            real business output.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
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
              className="rounded-[28px] border border-white/10 bg-white/[0.06] p-8 shadow-xl"
            >
              <h2 className="text-2xl font-black">{item.title}</h2>
              <div className="my-5 h-[2px] w-20 bg-[#F59E0B]" />
              <p className="leading-7 text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-4xl font-black">Get Free Access</h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
          Be among the first to access S8NT AI and stay updated on the launch.
        </p>

        <button
          onClick={handleWaitlistClick}
          className="mt-8 rounded-full bg-[#F59E0B] px-10 py-4 font-extrabold text-black hover:bg-[#fbbf24]"
        >
          Get Free Access
        </button>
      </section>
    </main>
  );
}