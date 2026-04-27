import type { Metadata } from "next";
import LandingPage from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: 'NexusAI | The Next Generation of Intelligence',
  description: 'Experience the future of AI chat with Nexus AI. Fast, secure, and incredibly smart.',
};

export default function Page() {
  return <LandingPage />;
}

