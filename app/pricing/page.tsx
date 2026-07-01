"use client";

import { useUser } from "@clerk/nextjs";

export default function PricingPage() {
  const { user } = useUser();

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      return;
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        userId: user.id,
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <img
            src="/logo.png"
            alt="S8NT Logo"
            className="h-16 w-16 object-contain mx-auto mb-4"
          />
          <h1 className="text-4xl md:text-5xl font-semibold">Choose Your Plan</h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            Start free, or unlock more access with Basic or Pro.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-[#101010] p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold">Free</h2>
            <p className="text-white/50 mt-2">Get started with S8NT.</p>

            <div className="mt-8">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-white/50 ml-2">/month</span>
            </div>

            <ul className="mt-8 space-y-4 text-white/80">
              <li>12 questions per day</li>
            </ul>

            <button className="mt-10 w-full rounded-2xl border border-white/10 bg-[#181818] py-4 text-lg font-semibold text-white hover:bg-[#202020] transition">
              Current Plan
            </button>
          </div>

          <div className="rounded-3xl border border-[#E8973A] bg-[#101010] p-8 shadow-2xl relative">
            <div className="absolute right-5 top-5 rounded-full bg-[#E8973A] px-3 py-1 text-sm font-semibold text-black">
              Popular
            </div>

            <h2 className="text-2xl font-semibold">Basic</h2>
            <p className="text-white/50 mt-2">More daily access and saved chats.</p>

            <div className="mt-8">
              <span className="text-4xl font-bold">$12</span>
              <span className="text-white/50 ml-2">/month</span>
            </div>

            <ul className="mt-8 space-y-4 text-white/80">
              <li>Save your chats</li>
              <li>30 questions per day</li>
            </ul>

            <button
  onClick={() => handleCheckout("price_1TLyEORs83QY6iuVaSGxiKRw")}
  className="mt-10 w-full rounded-2xl bg-[#E8973A] py-4 text-lg font-semibold text-black transition duration-200 hover:brightness-110 hover:scale-105 hover:shadow-[0_0_25px_rgba(232,151,58,0.6)]"
>
  Choose Basic
</button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#101010] p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold">Pro</h2>
            <p className="text-white/50 mt-2">Full access for power users.</p>

            <div className="mt-8">
              <span className="text-4xl font-bold">$20</span>
              <span className="text-white/50 ml-2">/month</span>
            </div>

            <ul className="mt-8 space-y-4 text-white/80">
              <li>Save your chats</li>
              <li>Unlimited questions</li>
              <li>Priority responses</li>
            </ul>

           <button
  onClick={() => handleCheckout("price_1TLy9yRs83QY6iuVYeM2lh3u")}
  className="mt-10 w-full rounded-2xl bg-[#E8973A] py-4 text-lg font-semibold text-black transition duration-200 hover:brightness-110 hover:scale-105 hover:shadow-[0_0_25px_rgba(232,151,58,0.6)]"
>
  Choose Pro
</button>
          </div>
        </div>
      </div>
    </main>
  );
}