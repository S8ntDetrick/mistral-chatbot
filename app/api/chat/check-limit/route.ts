import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get subscription
  const { data: sub } = await supabaseAdmin
    .from("subscriptions")
    .select("tier")
    .eq("clerk_user_id", userId)
    .single();

  const tier = sub?.tier || "free";

  // Set limits
  let limit = 12;
  if (tier === "basic") limit = 30;
  if (tier === "pro") limit = Infinity;

  // Get usage
  const { data: usage } = await supabaseAdmin
    .from("usage_tracking")
    .select("*")
    .eq("clerk_user_id", userId)
    .single();

  let used = usage?.daily_questions_used || 0;
  let lastReset = usage?.last_reset_date;

  const today = new Date().toISOString().slice(0, 10);

  // Reset if new day
  if (lastReset !== today) {
    used = 0;

    await supabaseAdmin
      .from("usage_tracking")
      .update({
        daily_questions_used: 0,
        last_reset_date: today,
      })
      .eq("clerk_user_id", userId);
  }

  // Check limit
  if (used >= limit) {
    return NextResponse.json({
      allowed: false,
      used,
      limit,
    });
  }

  // Increment usage
  await supabaseAdmin
    .from("usage_tracking")
    .update({
      daily_questions_used: used + 1,
    })
    .eq("clerk_user_id", userId);

  return NextResponse.json({
    allowed: true,
    used: used + 1,
    limit,
  });
}