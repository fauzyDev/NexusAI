import { FC } from "react";
import { SparkleIcon } from "@/components/chat/icons";
import MarkdownRenderer from "./MarkdownRenderer";

interface AIMessageProps {
  content: string;
}

export const AIMessage: FC<AIMessageProps> = ({ content }) => {
  const chips = ["How to add icons?", "Explain variant logic"];

  return (
    <div className="flex gap-6">
      {/* AI avatar */}
      <div className="w-10 h-10 rounded-full bg-indigo-600/20 shrink-0 flex items-center justify-center border border-indigo-500/30 self-start mt-0.5">
        <span className="text-indigo-400"><SparkleIcon /></span>
      </div> 

      {/* Content */}
      <div className="flex-1 space-y-4 min-w-0">
        <MarkdownRenderer content={content} />

        {/* Suggestion chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {chips.map((chip) => (
            <button
              key={chip}
              className="px-4 py-2 bg-slate-800 border border-white/5 rounded-full text-xs font-semibold text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}