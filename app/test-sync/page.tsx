"use client";

export default function TestSyncPage() {
  const syncUser = async () => {
    const res = await fetch("/api/user/sync", {
      method: "POST",
    });

    const data = await res.json();
    console.log(data);
    alert(JSON.stringify(data));
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Test Supabase User Sync</h1>
      <button
  onClick={async () => {
    const res = await fetch("/api/chat/check-limit", {
      method: "POST",
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  }}
>
  Test Limit
</button>
    </main>
  );
}