import { FC } from "react";
import { SidebarNavItem } from "./SidebarNavItem";
import { SidebarFooter } from "./SidebarFooter";
import { AddIcon, ChatIcon, HistoryIcon, SettingsIcon, SparkleIcon } from "@/components/chat/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "w-64 border-r border-white/5 bg-[#020617] h-screen fixed left-0 top-0 flex flex-col z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-2 text-indigo-400">
            <SparkleIcon />
            <span className="font-bold text-white text-lg tracking-wide">NexusAI</span>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white gap-2 font-semibold h-10 rounded-lg shadow-lg shadow-indigo-500/20">
            <AddIcon />
            New Chat
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4">Menu</div>
          <SidebarNavItem icon={<ChatIcon />} label="Chat" active={true} />
          <SidebarNavItem icon={<HistoryIcon />} label="History" />
          <SidebarNavItem icon={<SettingsIcon />} label="Settings" />
        </nav>

        {/* Footer */}
        <SidebarFooter />
      </aside>
    </>
  );
}
