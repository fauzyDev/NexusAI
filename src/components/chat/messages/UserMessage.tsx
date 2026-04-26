import { FC } from "react";

interface UserMessageProps {
  content: string;
  time?: string;
}

export const UserMessage: FC<UserMessageProps> = ({ content, time }) => {
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