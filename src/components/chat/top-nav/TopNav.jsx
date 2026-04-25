import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TuneIcon, SettingsIcon } from "@/components/chat/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TopNav({ activeModel, onModelChange }) {
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