import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import NexusAIChat from "@/components/NexusAIChat";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <NexusAIChat />;
}

