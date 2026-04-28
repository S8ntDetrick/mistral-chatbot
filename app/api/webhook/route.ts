import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

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

      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items"],
      });

      const userId = fullSession.metadata?.userId;
      const customerId = fullSession.customer as string;
      const subscriptionId = fullSession.subscription as string;
      const priceId = fullSession.line_items?.data?.[0]?.price?.id;

      if (!userId) {
        console.error("No userId found in checkout session metadata");
        return NextResponse.json({ received: true });
      }

      let tier = "free";

      if (priceId === process.env.STRIPE_BASIC_PRICE_ID) {
        tier = "basic";
      }

      if (priceId === process.env.STRIPE_PRO_PRICE_ID) {
        tier = "pro";
      }

      const { error } = await supabaseAdmin.from("subscriptions").upsert(
        {
          clerk_user_id: userId,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          tier,
          status: "active",
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "clerk_user_id",
        }
      );

      if (error) {
        console.error("Supabase subscription update error:", error);
        return new NextResponse("Database update failed", { status: 500 });
      }

      console.log("User subscription activated:", userId, tier);
    }

    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;

      const status = subscription.status;

      const shouldDowngrade =
        status === "canceled" ||
        status === "unpaid" ||
        status === "incomplete_expired";

      if (shouldDowngrade) {
        const { error } = await supabaseAdmin
          .from("subscriptions")
          .update({
            tier: "free",
            status: status,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);

        if (error) {
          console.error("Supabase downgrade error:", error);
          return new NextResponse("Database update failed", { status: 500 });
        }

        console.log("User downgraded due to subscription status:", status);
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;

      const { error } = await supabaseAdmin
        .from("subscriptions")
        .update({
          tier: "free",
          status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", subscription.id);

      if (error) {
        console.error("Supabase cancellation error:", error);
        return new NextResponse("Database update failed", { status: 500 });
      }

      console.log("User subscription canceled and downgraded to free");
    }

    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as Stripe.Invoice;

      const customerId = invoice.customer as string;

      const { error } = await supabaseAdmin
        .from("subscriptions")
        .update({
          tier: "free",
          status: "past_due",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_customer_id", customerId);

      if (error) {
        console.error("Supabase failed-payment error:", error);
        return new NextResponse("Database update failed", { status: 500 });
      }

      console.log("Payment failed. User downgraded to free.");
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Stripe webhook error:", err);
    return new NextResponse("Webhook handler failed", { status: 400 });
  }
}