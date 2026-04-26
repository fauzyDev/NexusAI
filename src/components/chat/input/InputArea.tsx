"use client";

import { useState, useRef } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AttachIcon, MicIcon, SendIcon } from "@/components/chat/icons";
import { cn } from "@/lib/utils";

export function InputArea({ onSend, isTyping }) {
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
            <Tooltip>
                <TooltipTrigger
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "text-slate-500 hover:text-indigo-400 hover:bg-transparent shrink-0 w-10 h-10 cursor-pointer"
                  )}
                >
                  <AttachIcon />
                </TooltipTrigger>
                <TooltipContent className="bg-slate-800 border-white/10 text-slate-200 text-xs">
                  Attach file
                </TooltipContent>
              </Tooltip>

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
              <Tooltip>
                  <TooltipTrigger
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "text-slate-500 hover:text-indigo-400 hover:bg-transparent w-10 h-10 cursor-pointer"
                    )}
                  >
                    <MicIcon />
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 border-white/10 text-slate-200 text-xs">
                    Voice input
                  </TooltipContent>
                </Tooltip>

              <Button
                size="icon"
                onClick={handleSend}
                className={cn(
                  "w-10 h-10 rounded-xl transition-all duration-200 shrink-0",
                  canSend
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-slate-800 text-slate-600 cursor-pointer"
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