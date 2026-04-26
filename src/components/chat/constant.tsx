import { ChatIcon, HistoryIcon, SettingsIcon } from "@/components/chat/icons";

export const MODELS = ["GPT-4", "Claude 3.5", "Local Llama"];

interface NavItem {
  icon: React.ReactNode;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { icon: <ChatIcon />, label: "Project Alpha" },
  { icon: <HistoryIcon />, label: "Market Research" },
  { icon: <SettingsIcon />, label: "Design System" },
];

export const CODE_SNIPPET = `const Button = ({ variant, children, ...props }) => {
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

export const INITIAL_MESSAGES: any[] = [];
