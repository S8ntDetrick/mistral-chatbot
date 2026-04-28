"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type SubscriptionData = {
  tier: string;
  status: string;
  stripe_customer_id: string | null;
};

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loadingSub, setLoadingSub] = useState(true);

  useEffect(() => {
    const loadSubscription = async () => {
      if (!isLoaded || !user) return;

      try {
        const res = await fetch("/api/subscription");
        const data = await res.json();

        if (!res.ok) {
          setSubscription({
            tier: "free",
            status: "none",
            stripe_customer_id: null,
          });
          return;
        }

        setSubscription(data);
      } catch {
        setSubscription({
          tier: "free",
          status: "none",
          stripe_customer_id: null,
        });
      } finally {
        setLoadingSub(false);
      }
    };

    loadSubscription();
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        Please sign in to manage your account.
      </main>
    );
  }

  const currentPlan = subscription?.tier || "free";
  const displayPlan =
    currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1);

  const isPaidUser =
    currentPlan === "basic" || currentPlan === "pro";

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#101010] p-8">
        <h1 className="text-3xl font-semibold mb-6">Account</h1>

        <div className="flex items-center gap-4 mb-8">
          <img
            src={user.imageUrl}
            alt="Profile"
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <p className="text-lg font-semibold">
              {user.fullName || user.username || "S8NT User"}
            </p>
            <p className="text-sm text-white/50">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-[#161616] p-5 mb-6">
          <p className="text-sm text-white/50">Current plan</p>
          <p className="text-xl font-semibold">
            {loadingSub ? "Loading..." : displayPlan}
          </p>

          {!loadingSub && subscription?.status !== "none" && (
            <p className="mt-1 text-sm text-white/40">
              Status: {subscription?.status}
            </p>
          )}
        </div>

        {isPaidUser ? (
          <button
            onClick={async () => {
              const res = await fetch("/api/create-portal-session", {
                method: "POST",
              });

              const data = await res.json();

              if (!res.ok) {
                alert(data.error || "Could not open billing portal.");
                return;
              }

              window.location.href = data.url;
            }}
            className="w-full rounded-2xl bg-[#E8973A] py-4 text-lg font-semibold text-black hover:brightness-105 transition"
          >
            Manage subscription
          </button>
        ) : (
          <a
            href="/pricing"
            className="block w-full rounded-2xl bg-[#E8973A] py-4 text-center text-lg font-semibold text-black hover:brightness-105 transition"
          >
            Upgrade plan
          </a>
        )}
      </div>
    </main>
  );
}