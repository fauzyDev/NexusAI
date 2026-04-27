"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AttachIcon, SendIcon, CloseIcon } from "@/components/chat/icons";
import { cn } from "@/lib/utils";

interface AttachedFile {
  file: File;
  preview: string;
}

export function InputArea({ onSend, isTyping }: { onSend: (text: string, files?: File[]) => void; isTyping: boolean }) {

  const [value, setValue] = useState("");
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if ((!value.trim() && files.length === 0) || isTyping) return;
    onSend(value.trim(), files.map(f => f.file));
    setValue("");
    setFiles([]);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: KeyboardEvent) => {

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles: AttachedFile[] = Array.from(selectedFiles).map(file => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : ""
    }));

    setFiles(prev => [...prev, ...newFiles]);
    e.target.value = ""; // Reset input
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const updated = [...prev];
      if (updated[index].preview) URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const canSend = (value.trim() || files.length > 0) && !isTyping;

  return (
    <div className="px-3 md:px-8 pb-4 md:pb-10 pt-0 shrink-0">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-[32px] p-2 md:p-4 shadow-2xl focus-within:border-indigo-500/30 transition-all duration-500">

          
          {/* File Previews */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 px-2 pb-2">
              {files.map((file, i) => (
                <div key={i} className="relative group w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border border-white/10 bg-slate-800">
                  {file.preview ? (
                    <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 p-1 text-center truncate">
                      {file.file.name}
                    </div>
                  )}
                  <Button 
                    onClick={() => removeFile(i)}
                    className="absolute top-0.5 right-0.5 bg-black/60 rounded-full p-0.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <CloseIcon size={12} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-1 md:gap-3">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              multiple 
              className="hidden" 
            />
            
            {/* Attach */}
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFileClick}
                  className="text-slate-400 hover:text-white hover:bg-white/5 shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl"
                >
                  <AttachIcon />
                </Button>
              </TooltipTrigger>

              <TooltipContent className="bg-slate-800 border-white/10 text-slate-200 text-xs">
                Attach files
              </TooltipContent>
            </Tooltip>

            {/* Textarea */}
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Message to Nexus AI..."
              rows={1}
              className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-200 py-3 md:py-4 resize-none text-sm md:text-base placeholder:text-slate-500 min-h-[44px] max-h-[200px] overflow-y-auto shadow-none"
            />

            {/* Send Button */}
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!canSend}
              className={cn(
                "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl transition-all duration-300 shrink-0",
                canSend
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-slate-800 text-slate-600 opacity-50"
              )}
            >
              <SendIcon />
            </Button>
          </div>
        </div>

        <p className="text-center text-[10px] md:text-[11px] text-slate-500 mt-3 font-medium opacity-80">
          Nexus AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}