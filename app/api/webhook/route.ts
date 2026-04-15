import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  return new Stripe(secretKey);
}

export async function POST(req: Request) {
  try {
    const stripe = getStripe();
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature");

    if (!signature) {
      return new NextResponse("Missing stripe-signature header", { status: 400 });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      return new NextResponse("Missing STRIPE_WEBHOOK_SECRET", { status: 500 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      console.log("Completed checkout for user:", userId);

      // update user tier here
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Stripe webhook error:", err);
    return new NextResponse("Webhook handler failed", { status: 400 });
  }
}