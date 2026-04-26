"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import type { User } from "@supabase/supabase-js";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login");
      } else {
        setUser(data.session.user);
        setChecking(false);
      }
    });
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (checking) {
    return null;
  }

  return (
    <div className="min-h-screen max-w-xl mx-auto border-x border-gray-700">
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">ホーム</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 truncate max-w-[160px]">
            {user?.email}
          </span>
          <button
            onClick={handleSignOut}
            className="text-sm px-3 py-1 border border-gray-600 rounded-full hover:bg-gray-800 transition-colors"
          >
            ログアウト
          </button>
        </div>
      </header>

      <PostForm userId={user!.id} onPosted={() => setRefresh((r) => r + 1)} />
      <PostList refresh={refresh} />
    </div>
  );
}
