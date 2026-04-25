import { SparkleIcon } from "@/components/chat/icons"
import { CODE_SNIPPET } from "@/components/chat/constant";
import { CodeBlock } from "./CodeBlock";

export function AIMessage() {
  const chips = ["How to add icons?", "Explain variant logic"];

  return (
    <div className="flex gap-6">
      {/* AI avatar */}
      <div className="w-10 h-10 rounded-full bg-indigo-600/20 shrink-0 flex items-center justify-center border border-indigo-500/30 self-start mt-0.5">
        <span className="text-indigo-400"><SparkleIcon /></span>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-4 min-w-0">
        <p className="text-sm leading-relaxed text-slate-300">
          Certainly, Alex. A modular button component is a staple of any high-end design system.
          Here is a minimalist implementation using{" "}
          <span className="text-indigo-400 font-semibold">Tailwind CSS</span> and{" "}
          <span className="text-indigo-400 font-semibold">class-variance-authority</span> for
          clean management of variants.
        </p>

        <CodeBlock filename="Button.tsx" code={CODE_SNIPPET} />

        <p className="text-sm leading-relaxed text-slate-300">
          This structure allows you to scale your interface by simply adding new keys to the{" "}
          <code className="bg-white/10 px-1.5 py-0.5 rounded text-indigo-300 text-xs font-mono">
            variants
          </code>{" "}
          object.
        </p>

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