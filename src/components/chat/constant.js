import { ChatIcon, HistoryIcon, SettingsIcon } from "./icons/index";

export const MODELS = ["GPT-4", "Claude 3.5", "Local Llama"];

export const NAV_ITEMS = [
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

export const INITIAL_MESSAGES = [
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