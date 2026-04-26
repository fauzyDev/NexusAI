import { FC } from "react";

export const TypingIndicator: FC = () => {
  return (
    <div className="flex items-center gap-3 ml-16">
      <div className="flex gap-1.5">
        {[0, 0.2, 0.4].map((delay, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-indigo-500/40 animate-pulse"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>
      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
        Nexus is thinking
      </span>
    </div>
  );
}