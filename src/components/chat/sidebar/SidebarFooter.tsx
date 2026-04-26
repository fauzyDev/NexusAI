import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogoutIcon } from "@/components/chat/icons";

export const SidebarFooter: FC = () => {
  return (
    <div className="p-6 space-y-4">
      {/* Footer links */}
      <div className="space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors duration-200 rounded-lg text-xs font-semibold">
          <LogoutIcon />
          Logout
        </button>
      </div>

      {/* User profile */}
      <div className="flex items-center gap-3 pt-2">
        <Avatar className="w-10 h-10 border border-white/20">
          <AvatarImage src="https://i.pravatar.cc/40?img=12" alt="Alex Rivera" />
          <AvatarFallback className="bg-indigo-600/20 text-indigo-400 font-bold text-sm">
            AR
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">Alex Rivera</p>
          <p className="text-slate-500 text-xs">alex@nexus.ai</p>
        </div>
      </div>
    </div>
  );
}
