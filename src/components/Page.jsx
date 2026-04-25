"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// ─── Icons ─────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const BoltIcon = () => <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>;
const AddIcon = () => <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
const ChatIcon = () => <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
const HistoryIcon = () => <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 8 12 12 14 14" /><path d="M3.05 11a9 9 0 1 0 .5-4.06" /><polyline points="3 2 3 7 8 7" /></svg>;
const SettingsIcon = () => <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
const HelpIcon = () => <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
const LogoutIcon = () => <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>;
const TuneIcon = () => <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>;
const AttachIcon = () => <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>;
const MicIcon = () => <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>;
const SendIcon = () => <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>;
const CopyIcon = () => <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>;
const SparkleIcon = () => <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>;

// ─── Constants ─────────────────────────────────────────────────────────────────
const MODELS = ["GPT-4", "Claude 3.5", "Local Llama"];

const NAV_ITEMS = [
  { icon: <ChatIcon />, label: "Project Alpha" },
  { icon: <HistoryIcon />, label: "Market Research" },
  { icon: <SettingsIcon />, label: "Design System" },
];

const CODE_SNIPPET = `const Button = ({ variant, children, ...props }) => {
  const baseStyles = "px-6 py-2 rounded-lg transition-all font-semibold";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500",
    secondary: "border border-white/10 text-slate-300 hover:bg-white/5",
  };

  return (
    <button className={\`\${baseStyles} \${variants[variant]}\`} {...props}>
      {children}
    </button>
  );
};`;

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "user",
    content: "Can you show me a clean implementation of a Tailwind-styled button component in React? I want it to be reusable with different variants like primary and secondary.",
    time: "Sent 10:24 AM",
  },
  {
    id: 2,
    role: "assistant",
  },
];

// ─── Sidebar ────────────────────────────────────────────────────────────────────
function SidebarNavItem({ icon, label, active = false }) {
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

function Sidebar() {
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

// ─── Top Nav ────────────────────────────────────────────────────────────────────
function TopNav({ activeModel, onModelChange }) {
  return (
    <header className="fixed top-0 right-0 left-64 z-40 flex justify-between items-center px-8 h-16 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-8">
        <span className="text-xl font-black tracking-tighter text-slate-50">Nexus AI</span>
        <nav className="flex gap-6">
          {MODELS.map((model) => (
            <button
              key={model}
              onClick={() => onModelChange(model)}
              className={cn(
                "text-sm font-medium pb-1 transition-all",
                activeModel === model
                  ? "text-indigo-400 border-b-2 border-indigo-400"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              {model}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <TooltipProvider>
          <div className="flex gap-1">
            {[
              { icon: <TuneIcon />, tip: "Tune" },
              { icon: <SettingsIcon />, tip: "Settings" },
            ].map(({ icon, tip }) => (
              <Tooltip key={tip}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-indigo-300 hover:bg-white/5 w-9 h-9"
                  >
                    {icon}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-slate-800 border-white/10 text-slate-200 text-xs">
                  {tip}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        <Separator orientation="vertical" className="h-5 bg-white/10" />

        <Button
          variant="outline"
          size="sm"
          className="border-white/10 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white text-xs h-8"
        >
          Export
        </Button>
        <Button
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-8"
        >
          Share
        </Button>
      </div>
    </header>
  );
}

// ─── Code Block ─────────────────────────────────────────────────────────────────
function CodeBlock({ filename, code }) {
  const [copied, setCopied] = useState(false);

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

// ─── Messages ───────────────────────────────────────────────────────────────────
function UserMessage({ content, time }) {
  return (
    <div className="flex flex-col items-end">
      <div className="max-w-[85%] bg-slate-900 border border-white/10 p-6 rounded-2xl rounded-tr-none shadow-sm">
        <p className="text-sm leading-relaxed text-slate-200">{content}</p>
      </div>
      <span className="text-[10px] text-slate-500 mt-2 font-semibold uppercase tracking-widest">
        {time}
      </span>
    </div>
  );
}

function AIMessage() {
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

function TypingIndicator() {
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

// ─── Input Area ─────────────────────────────────────────────────────────────────
function InputArea({ onSend, isTyping }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (!value.trim() || isTyping) return;
    onSend(value.trim());
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  const canSend = value.trim() && !isTyping;

  return (
    <div className="p-6 md:px-12 pt-0 shrink-0">
      <div className="max-w-[800px] mx-auto">
        <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-2 shadow-2xl focus-within:border-indigo-500/50 transition-all duration-200">
          <div className="flex items-end gap-2">
            {/* Attach */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-500 hover:text-indigo-400 hover:bg-transparent shrink-0 w-10 h-10"
                  >
                    <AttachIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-800 border-white/10 text-slate-200 text-xs">
                  Attach file
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Textarea */}
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message to Nexus AI..."
              rows={1}
              className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-200 py-3 resize-none text-sm placeholder:text-slate-600 min-h-[44px] max-h-[160px] overflow-y-auto shadow-none"
            />

            {/* Right actions */}
            <div className="flex items-center gap-1 shrink-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-500 hover:text-indigo-400 hover:bg-transparent w-10 h-10"
                    >
                      <MicIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 border-white/10 text-slate-200 text-xs">
                    Voice input
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                size="icon"
                onClick={handleSend}
                disabled={!canSend}
                className={cn(
                  "w-10 h-10 rounded-xl transition-all duration-200 shrink-0",
                  canSend
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-slate-800 text-slate-600 cursor-not-allowed"
                )}
              >
                <SendIcon />
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-600 mt-4 font-medium">
          Nexus AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}

// ─── Root ───────────────────────────────────────────────────────────────────────
export default function NexusAIChat() {
  const [activeModel, setActiveModel] = useState("GPT-4");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content: text,
        time: `Sent ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`,
      },
    ]);
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1800));
    setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant" }]);
    setIsTyping(false);
  };

  return (
    <div className="dark bg-[#020617] text-slate-200 min-h-screen" style={{ fontFamily: "Manrope, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(185,199,224,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(185,199,224,0.4); }
      `}</style>

      <Sidebar />
      <TopNav activeModel={activeModel} onModelChange={setActiveModel} />

      <main className="pl-64 pt-16 h-screen flex flex-col overflow-hidden">
        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 md:px-12 py-12"
        >
          <div className="max-w-[800px] mx-auto space-y-12">
            {messages.map((msg) =>
              msg.role === "user" ? (
                <UserMessage key={msg.id} content={msg.content} time={msg.time} />
              ) : (
                <AIMessage key={msg.id} />
              )
            )}
            {isTyping && <TypingIndicator />}
          </div>
        </div>

        {/* Input */}
        <InputArea onSend={handleSend} isTyping={isTyping} />
      </main>
    </div>
  );
}