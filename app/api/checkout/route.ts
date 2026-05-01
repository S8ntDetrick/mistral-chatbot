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
    const { priceId, userId } = await req.json();

    if (!priceId || !userId) {
      return NextResponse.json(
        { error: "Missing priceId or userId" },
        { status: 400 }
      );
    }

    const allowedPriceIds = [
      process.env.STRIPE_BASIC_PRICE_ID,
      process.env.STRIPE_PRO_PRICE_ID,
    ];

    if (!allowedPriceIds.includes(priceId)) {
      return NextResponse.json(
        { error: "Invalid priceId" },
        { status: 400 }
      );
    }

    const origin = new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/chat?checkout=success`,
      cancel_url: `${origin}/pricing`,

      metadata: {
        userId,
        priceId,
      },

      subscription_data: {
        metadata: {
          userId,
          priceId,
        },
      },

      client_reference_id: userId,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}