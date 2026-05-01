import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .select(
      "tier, status, stripe_customer_id, cancel_at_period_end, current_period_end"
    )
    .eq("clerk_user_id", userId)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: "Failed to load subscription" },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json({
      tier: "free",
      status: "none",
      stripe_customer_id: null,
      cancel_at_period_end: false,
      current_period_end: null,
    });
  }

  return NextResponse.json({
    tier: data.tier || "free",
    status: data.status || "none",
    stripe_customer_id: data.stripe_customer_id || null,
    cancel_at_period_end: data.cancel_at_period_end || false,
    current_period_end: data.current_period_end || null,
  });
}