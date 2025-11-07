"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/clients";

const supabase = createClient();

export default function LogoutButton() {
  const router = useRouter();

  // ログアウト処理
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); // ページをリフレッシュしてログアウト状態を反映
  };

  return (
    <button 
      onClick={handleLogout}
      className="px-3 py-1 text-blue-500 bg-blue-50 rounded hover:bg-blue-600"
    >
      ログアウト
    </button>
  );
}