import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const FREE_CHAT_SAVE_LIMIT = 10;

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("saved_chats")
    .select("id, title, messages, images, created_at, updated_at")
    .eq("clerk_user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to load saved chats" }, { status: 500 });
  }

  return NextResponse.json({ chats: data });
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, title, messages, images } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "No messages to save" }, { status: 400 });
  }

  const chatTitle =
    title ||
    messages[0]?.content?.slice(0, 50) ||
    "New Chat";

  if (id) {
    const { data, error } = await supabaseAdmin
      .from("saved_chats")
      .update({
        ...(title ? { title: chatTitle } : {}),
        messages,
        images: images || [],
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("clerk_user_id", userId)
      .select("id, title, messages, images, created_at, updated_at")
      .single();

    if (error) {
      console.error("UPDATE CHAT ERROR:", error);

      return NextResponse.json(
        { error: error.message || "Failed to update chat" },
        { status: 500 }
      );
    }

    return NextResponse.json({ chat: data });
  }

  const { data: sub } = await supabaseAdmin
    .from("subscriptions")
    .select("tier")
    .eq("clerk_user_id", userId)
    .single();

  const userTier = sub?.tier || "free";
  const isPaidUser = userTier === "basic" || userTier === "pro";

  if (!isPaidUser) {
    const { count, error: countError } = await supabaseAdmin
      .from("saved_chats")
      .select("id", { count: "exact", head: true })
      .eq("clerk_user_id", userId);

    if (countError) {
      console.error("SAVE LIMIT ERROR:", countError);

      return NextResponse.json(
        { error: countError.message || "Failed to check save limit" },
        { status: 500 }
      );
    }

    if ((count || 0) >= FREE_CHAT_SAVE_LIMIT) {
      return NextResponse.json(
        { error: "Free users can save up to 10 chats. Upgrade for unlimited saved chats." },
        { status: 403 }
      );
    }
  }

  const { data, error } = await supabaseAdmin
    .from("saved_chats")
    .insert({
      clerk_user_id: userId,
      title: chatTitle,
      messages,
      images: images || [],
      updated_at: new Date().toISOString(),
    })
    .select("id, title, messages, images, created_at, updated_at")
    .single();

  if (error) {
    console.error("SAVE CHAT ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Failed to save chat" },
      { status: 500 }
    );
  }

  return NextResponse.json({ chat: data });
}

export async function DELETE(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("saved_chats")
    .delete()
    .eq("id", id)
    .eq("clerk_user_id", userId);

  if (error) {
    console.error("DELETE CHAT ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Failed to delete chat" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}