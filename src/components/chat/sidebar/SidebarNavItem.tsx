import { FC } from "react";
import { cn } from "@/lib/utils";

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export const SidebarNavItem: FC<SidebarNavItemProps> = ({ icon, label, active = false }) => {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200",
        active
          ? "bg-indigo-600/10 text-indigo-400"
          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span>{label}</span>
    </button>
  );
}