"use client";

import { FC, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutIcon } from "@/components/chat/icons";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const SidebarFooter: FC = () => {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="p-6 space-y-4">
      {/* Footer links */}
      <div className="space-y-1">
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors duration-200 rounded-lg text-xs font-semibold cursor-pointer"
        >
          <LogoutIcon />
          Logout
        </button>
      </div>

      {/* User profile */}
      <div className="flex items-center gap-3 pt-2">
        <Avatar size="lg" className="border border-white/20">

          <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name} />
          <AvatarFallback className="bg-indigo-600/20 text-indigo-400 font-bold text-sm uppercase">
            {user.user_metadata?.full_name?.substring(0, 2) || user.email?.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm leading-tight truncate">
            {user.user_metadata?.full_name || "User"}
          </p>
          <p className="text-slate-500 text-xs truncate">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

