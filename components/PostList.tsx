"use client";

import { useEffect, useState } from "react";
import { supabase, Post } from "@/lib/supabase";

type Props = {
  refresh: number;
};

export default function PostList({ refresh }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const { data } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      setPosts(data ?? []);
      setLoading(false);
    }
    fetchPosts();
  }, [refresh]);

  if (loading) {
    return <p className="text-center text-gray-500 py-8">読み込み中...</p>;
  }

  if (posts.length === 0) {
    return <p className="text-center text-gray-500 py-8">まだつぶやきがありません</p>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="border-b border-gray-700 px-4 py-4">
          <p className="text-xs text-gray-500 mb-1">
            {new Date(post.created_at).toLocaleString("ja-JP")}
          </p>
          <p className="whitespace-pre-wrap">{post.content}</p>
        </li>
      ))}
    </ul>
  );
}
