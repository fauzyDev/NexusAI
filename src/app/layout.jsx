import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
// import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mikochat Ai",
  description: "project chat ai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={cn("dark text-foreground bg-background", "font-sans", geist.variable)}>
      <body className={inter.className} suppressHydrationWarning={true}>
        {/* <TooltipProvider> */}
          {children}
        {/* </TooltipProvider> */}
      </body>
    </html>
  );
}
