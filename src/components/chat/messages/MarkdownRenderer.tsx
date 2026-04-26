"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyIcon, CheckIcon } from "@/components/chat/icons";
import { Button } from "@/components/ui/button";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="markdown-content prose prose-invert prose-slate max-w-none prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent prose-code:text-indigo-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const [copied, setCopied] = useState(false);

            const handleCopy = () => {
              const codeString = String(children).replace(/\n$/, "");
              navigator.clipboard.writeText(codeString);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            };

            return !inline && match ? (
              <div className="relative group my-6 rounded-xl overflow-hidden border border-white/10 bg-[#0f172a] shadow-2xl transition-all duration-300 hover:border-indigo-500/30">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-white/5 backdrop-blur-sm">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                    {match[1]}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-7 px-2 gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    {copied ? (
                      <span className="flex items-center gap-1">
                        <CheckIcon />
                        <span>Copied</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <CopyIcon />
                        <span>Copy</span>
                      </span>
                    )}
                  </Button>
                </div>
                <div className="p-0 overflow-x-auto custom-scrollbar">
                  <SyntaxHighlighter
                    {...props}
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    className="!bg-transparent !p-4 !m-0 !text-sm !leading-relaxed"
                    customStyle={{
                      background: "transparent",
                      padding: "1rem",
                      margin: 0,
                    }}
                    codeTagProps={{
                      className: "font-mono",
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              </div>
            ) : (
              <code className={`${className} bg-white/10 px-1.5 py-0.5 rounded text-indigo-300 text-xs font-mono`} {...props}>
                {children}
              </code>
            );
          },
          // Custom styling for other elements
          a: ({ node, ...props }) => <a className="text-indigo-400 hover:text-indigo-300 transition-colors underline decoration-indigo-500/30 underline-offset-4" {...props} />,
          h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-white mt-8 mb-4 tracking-tight" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-lg font-bold text-white mt-6 mb-3 tracking-tight" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-base font-bold text-white mt-4 mb-2 tracking-tight" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 my-4 text-slate-300" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 my-4 text-slate-300" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-indigo-500/50 bg-indigo-500/5 pl-4 py-2 my-6 rounded-r-lg italic text-slate-400" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-white/10">
              <table className="w-full text-sm text-left text-slate-300" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => <th className="px-4 py-3 bg-slate-800/50 font-bold text-white border-b border-white/10" {...props} />,
          td: ({ node, ...props }) => <td className="px-4 py-3 border-b border-white/5" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
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
};

export default MarkdownRenderer;
