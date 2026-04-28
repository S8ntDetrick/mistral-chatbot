import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const prompt = body.prompt;

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const { data: sub } = await supabaseAdmin
    .from("subscriptions")
    .select("tier")
    .eq("clerk_user_id", userId)
    .single();

  const tier = sub?.tier || "free";

  // ✅ Fix: allow null for unlimited
  let limit: number | null = 12;

  if (tier === "basic") limit = 40;
  if (tier === "pro") limit = null;

  const today = new Date().toISOString().slice(0, 10);

  const { data: usage } = await supabaseAdmin
    .from("usage_tracking")
    .select("*")
    .eq("clerk_user_id", userId)
    .single();

  let used = usage?.daily_questions_used || 0;
  const lastReset = usage?.last_reset_date;

  if (lastReset !== today) {
    used = 0;

    await supabaseAdmin.from("usage_tracking").upsert(
      {
        clerk_user_id: userId,
        daily_questions_used: 0,
        last_reset_date: today,
      },
      { onConflict: "clerk_user_id" }
    );
  }

  // ✅ Fix: safe unlimited check
  if (limit !== null && used >= limit) {
    return NextResponse.json(
      {
        error: "Daily limit reached",
        message:
          tier === "free"
            ? "You have reached your 12 free questions for today. Upgrade here: https://s8nt.ai/pricing"
            : "You have reached your daily question limit. Upgrade to Pro for unlimited access: https://s8nt.ai/pricing",
        allowed: false,
        tier,
        used,
        limit,
      },
      { status: 429 }
    );
  }

  await supabaseAdmin.from("usage_tracking").upsert(
    {
      clerk_user_id: userId,
      daily_questions_used: used + 1,
      last_reset_date: today,
    },
    { onConflict: "clerk_user_id" }
  );

  // TEMPORARY RESPONSE UNTIL RUNPOD IS ACTIVE
  const response = `S8NT response to: "${prompt}"`;

  // ✅ Only paid users get saved chats
  if (tier === "basic" || tier === "pro") {
    await supabaseAdmin.from("chats").insert([
      {
        clerk_user_id: userId,
        conversation_id: body.conversation_id ?? null,
        role: "user",
        content: prompt,
      },
      {
        clerk_user_id: userId,
        conversation_id: body.conversation_id ?? null,
        role: "assistant",
        content: response,
      },
    ]);
  }

  return NextResponse.json({
    response,
    allowed: true,
    tier,
    used: used + 1,
    limit: tier === "pro" ? "unlimited" : limit,
  });
}