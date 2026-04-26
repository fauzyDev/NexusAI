import { FC } from "react";
import { cn } from "@/lib/utils";

interface TopNavProps {
  onToggleSidebar: () => void;
}

export const TopNav: FC<TopNavProps> = ({ onToggleSidebar }) => {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 z-40 flex justify-between items-center px-4 md:px-8 h-16 bg-slate-950/80 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="md:hidden text-slate-400 hover:text-white p-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <span className="text-xl font-black tracking-tighter text-slate-50">Nexus AI</span>
      </div>
    </header>
  );
}