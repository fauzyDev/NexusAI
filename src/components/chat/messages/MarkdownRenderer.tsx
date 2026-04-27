"use client";

import React, { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Separate components to avoid re-creation on every render
const MarkdownComponents: any = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";
    const value = String(children).replace(/\n$/, "");

    if (!inline && language) {
      return <CodeBlock language={language} value={value} />;
    }

    return (
      <code 
        className={cn(
          "bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded font-mono text-[0.9em]",
          className
        )} 
        {...props}
      >
        {children}
      </code>
    );
  },
  
  a: ({ node, ...props }: any) => (
    <a 
      className="text-indigo-400 hover:text-indigo-300 transition-colors underline decoration-indigo-500/30 underline-offset-4 font-medium" 
      target="_blank"
      rel="noopener noreferrer"
      {...props} 
    />
  ),
  
  h1: ({ node, ...props }: any) => (
    <h1 className="text-xl md:text-2xl font-bold text-white mt-8 md:mt-10 mb-4 md:mb-6 tracking-tight border-b border-white/5 pb-2" {...props} />
  ),
  
  h2: ({ node, ...props }: any) => (
    <h2 className="text-lg md:text-xl font-bold text-white mt-6 md:mt-8 mb-3 md:mb-4 tracking-tight" {...props} />
  ),
  
  h3: ({ node, ...props }: any) => (
    <h3 className="text-base md:text-lg font-bold text-white mt-4 md:mt-6 mb-2 md:mb-3 tracking-tight" {...props} />
  ),

  
  p: ({ node, ...props }: any) => (
    <p className="leading-7 text-slate-300 mb-5 last:mb-0" {...props} />
  ),
  
  ul: ({ node, ...props }: any) => (
    <ul className="list-disc list-outside ml-6 space-y-2 mb-5 text-slate-300" {...props} />
  ),
  
  ol: ({ node, ...props }: any) => (
    <ol className="list-decimal list-outside ml-6 space-y-2 mb-5 text-slate-300" {...props} />
  ),
  
  li: ({ node, ...props }: any) => (
    <li className="pl-1" {...props} />
  ),
  
  blockquote: ({ node, ...props }: any) => (
    <blockquote className="border-l-4 border-indigo-500/50 bg-indigo-500/5 pl-5 py-3 my-6 rounded-r-lg italic text-slate-300/90" {...props} />
  ),
  
  table: ({ node, ...props }: any) => (
    <div className="overflow-x-auto my-8 rounded-xl border border-white/10 bg-slate-900/20 backdrop-blur-sm shadow-inner">
      <table className="w-full text-sm text-left text-slate-300 border-collapse" {...props} />
    </div>
  ),
  
  thead: ({ node, ...props }: any) => (
    <thead className="bg-slate-800/40 text-slate-200 uppercase text-[11px] font-bold tracking-wider" {...props} />
  ),
  
  th: ({ node, ...props }: any) => (
    <th className="px-5 py-3 border-b border-white/10" {...props} />
  ),
  
  td: ({ node, ...props }: any) => (
    <td className="px-5 py-4 border-b border-white/5 bg-slate-800/10" {...props} />
  ),
  
  hr: ({ node, ...props }: any) => (
    <hr className="my-10 border-white/5" {...props} />
  ),
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = memo(({ content, className }) => {
  return (
    <div className={cn("markdown-content max-w-none text-[15px] md:text-base", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={MarkdownComponents}
      >
        {content}
      </ReactMarkdown>
      
      <style jsx global>{`
        .markdown-content table tr:last-child td {
          border-bottom: none;
        }
        .markdown-content table tr:hover td {
          background-color: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
});

MarkdownRenderer.displayName = "MarkdownRenderer";

export default MarkdownRenderer;

