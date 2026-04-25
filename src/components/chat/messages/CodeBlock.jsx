"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@/components/chat/icons";

export function CodeBlock({ filename, code }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard?.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    // Syntax: tokenize keywords, strings, JSX tags
    const renderHighlighted = (raw) => {
        const lines = raw.split("\n");
        return lines.map((line, li) => {
            const tokens = line.split(/("(?:[^"\\]|\\.)*"|\b(?:const|return)\b|<\/?button>)/g);
            return (
                <span key={li}>
                    {tokens.map((tok, ti) => {
                        if (tok === "const" || tok === "return")
                            return <span key={ti} className="text-indigo-400">{tok}</span>;
                        if (tok.startsWith('"'))
                            return <span key={ti} className="text-emerald-400">{tok}</span>;
                        if (tok === "<button>" || tok === "</button>")
                            return <span key={ti}>{"<"}<span className="text-pink-400">button</span>{">"}</span>;
                        return <span key={ti}>{tok}</span>;
                    })}
                    {li < lines.length - 1 && "\n"}
                </span>
            );
        });
    };

    return (
        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#0f172a]">
            <div className="bg-slate-800/50 px-4 py-2 flex justify-between items-center border-b border-white/5">
                <span className="text-xs font-mono text-slate-400">{filename}</span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-7 px-2 gap-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/5"
                >
                    <CopyIcon />
                    {copied ? "Copied!" : "Copy code"}
                </Button>
            </div>
            <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-slate-300 whitespace-pre">
                {renderHighlighted(code)}
            </pre>
        </div>
    );
}