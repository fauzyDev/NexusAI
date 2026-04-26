import type { Metadata } from "next";
import NexusAIChat from "@/components/NexusAIChat";

export const metadata: Metadata = {
  title: 'NexusAI Chat',
  description: 'AI Chat Interface',
};

export default function Page() {
  return <NexusAIChat />;
}
