"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  userId: string;
  onPosted: () => void;
};

export default function PostForm({ userId, onPosted }: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    await supabase.from("posts").insert({ user_id: userId, content: content.trim() });
    setContent("");
    setLoading(false);
    onPosted();
  }

  return (
    <form onSubmit={handleSubmit} className="border-b border-gray-700 p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={280}
        placeholder="いまどうしてる？"
        rows={3}
        className="w-full bg-transparent resize-none focus:outline-none text-lg placeholder-gray-500"
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-gray-500">{content.length}/280</span>
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="px-5 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded-full font-bold transition-colors"
        >
          {loading ? "..." : "つぶやく"}
        </button>
      </div>
    </form>
  );
}
