import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: sub, error } = await supabaseAdmin
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("clerk_user_id", userId)
    .single();

  if (error || !sub?.stripe_customer_id) {
    return NextResponse.json(
      { error: "No Stripe customer found for this account." },
      { status: 404 }
    );
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: sub.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account`,
  });

  return NextResponse.json({ url: session.url });
}