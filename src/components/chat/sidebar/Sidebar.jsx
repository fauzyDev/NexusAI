import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BoltIcon, AddIcon, HelpIcon, LogoutIcon }  from "@/components/chat/icons";
import { SidebarNavItem } from "./SidebarNavItem";
import { NAV_ITEMS } from "@/components/chat/constant";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 flex flex-col bg-slate-900 h-screen w-64 border-r border-white/10 z-50">
      <div className="p-6 flex-1">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <BoltIcon />
          </div>
          <h1 className="text-lg font-bold text-slate-50">AI Assistant</h1>
        </div>

        {/* Nav */}
        <nav className="space-y-1">
          <SidebarNavItem icon={<AddIcon />} label="New Chat" active />
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem key={item.label} icon={item.icon} label={item.label} />
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className="p-6 space-y-4">
        {/* Upgrade card */}
        <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5">
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
            Elite Tier
          </p>
          <Button
            size="sm"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs h-8 rounded-lg"
          >
            Upgrade to Pro
          </Button>
        </div>

        <Separator className="bg-white/10" />

        {/* Footer links */}
        <div className="space-y-1">
          {[
            { icon: <HelpIcon />, label: "Help Center" },
            { icon: <LogoutIcon />, label: "Logout" },
          ].map(({ icon, label }) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors duration-200 rounded-lg text-xs font-semibold"
            >
              {icon}
              {label}
            </button>
          ))}
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
    </aside>
  );
}