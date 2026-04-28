import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress ?? null;

  const profileResult = await supabaseAdmin
    .from("profiles")
    .upsert({
      clerk_user_id: userId,
      email,
    })
    .select();

  const subscriptionResult = await supabaseAdmin
    .from("subscriptions")
    .upsert({
      clerk_user_id: userId,
      tier: "free",
      status: "active",
    })
    .select();

  const usageResult = await supabaseAdmin
    .from("usage_tracking")
    .upsert({
      clerk_user_id: userId,
      daily_questions_used: 0,
      last_reset_date: new Date().toISOString().slice(0, 10),
    })
    .select();

  if (profileResult.error || subscriptionResult.error || usageResult.error) {
    return NextResponse.json(
      {
        success: false,
        profileError: profileResult.error,
        subscriptionError: subscriptionResult.error,
        usageError: usageResult.error,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    profile: profileResult.data,
    subscription: subscriptionResult.data,
    usage: usageResult.data,
  });
}