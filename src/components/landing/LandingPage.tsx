"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  SparkleIcon, 
  BoltIcon, 
  ChatIcon, 
  HistoryIcon, 
  AttachIcon,
  SettingsIcon
} from "@/components/chat/icons";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, [supabase.auth]);

  const handleLaunch = () => {
    if (user) {
      router.push("/chat");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30 overflow-x-hidden font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        .font-sans {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .mesh-gradient {
          background-image: 
            radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
            radial-gradient(at 50% 0%, hsla(225,39%,30%,0.2) 0, transparent 50%), 
            radial-gradient(at 100% 0%, hsla(339,49%,30%,0.15) 0, transparent 50%);
        }

        .grid-pattern {
          background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-60"></div>
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[140px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[140px] rounded-full animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2.5 text-indigo-400"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-lg shadow-indigo-500/10">
                <SparkleIcon />
              </div>
              <span className="font-bold text-white text-xl tracking-tight">NexusAI</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <Button 
                variant="ghost"
                onClick={handleLaunch}
                className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                Sign In
              </Button>
              <Button 
                onClick={handleLaunch}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 h-10 rounded-full transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
              >
                {loading ? "..." : user ? "Open App" : "Get Started"}
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-56 md:pb-48 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider"
            >
              <BoltIcon />
              <span>Next Generation AI Experience</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-9xl font-extrabold tracking-tight text-white leading-[0.9] md:leading-[0.85]"
            >
              Think Faster. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-400">Build Smarter.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto text-lg md:text-2xl text-slate-400 font-medium leading-relaxed"
            >
              Nexus AI is the premium workspace where your ideas evolve with intelligence. 
              Upload, code, and chat with state-of-the-art models.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8"
            >
              <Button 
                onClick={handleLaunch}
                className="h-14 px-10 text-lg bg-white text-black hover:bg-slate-200 font-bold rounded-2xl shadow-2xl shadow-white/5 transition-all hover:scale-105 active:scale-95"
              >
                {user ? "Continue to Dashboard" : "Start Chatting Free"}
              </Button>
              <Button variant="outline" className="h-14 px-10 text-lg text-white font-bold bg-white/5 hover:bg-white/10 rounded-2xl border-white/10 backdrop-blur-sm">
                Documentation
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-40 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Core Capabilities</h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium">Everything you need to work with AI, all in one place.</p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <FeatureCard 
              icon={<ChatIcon />}
              title="Advanced AI Chat"
              description="Real-time, context-aware conversations powered by Gemini 2.5 Flash for nuanced understanding."
            />
            <FeatureCard 
              icon={<AttachIcon />}
              title="File Upload & Vision"
              description="Upload documents, code files, or images for instant analysis and multi-modal interaction."
            />
            <FeatureCard 
              icon={<HistoryIcon />}
              title="Save History"
              description="Persistent conversation history allows you to resume any chat and never lose progress."
            />
            <FeatureCard 
              icon={<BoltIcon />}
              title="Smart Code Gen"
              description="Professional-grade code generation with automatic syntax highlighting and optimization."
            />
            <FeatureCard 
              icon={<SparkleIcon />}
              title="Google Login"
              description="Seamless and secure one-tap authentication with Google via Supabase Auth integration."
            />
            <FeatureCard 
              icon={<SettingsIcon />}
              title="Clean & Modern UI"
              description="Futuristic, dark-themed interface designed for focus, speed, and premium user experience."
            />
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-40 relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">How it works.</h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">Experience the future of AI in three simple steps.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-8">
            <StepCard 
              number="01"
              title="Connect Account"
              description="Securely sign in with your Google account to sync your history and preferences."
            />
            <StepCard 
              number="02"
              title="Interact & Analyze"
              description="Type prompts or upload files. Nexus AI processes your data with high precision."
            />
            <StepCard 
              number="03"
              title="Scale Ideas"
              description="Export code, save insights, and continue your workflow across any device."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-48 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/20"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 space-y-10">
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">Elevate your <br /> workflow today.</h2>
              <p className="text-white/80 text-xl font-medium max-w-xl mx-auto">
                Join the future of intelligence. Nexus AI is ready when you are.
              </p>
              <Button 
                onClick={handleLaunch}
                className="h-16 px-14 text-xl bg-white text-indigo-600 hover:bg-slate-100 font-extrabold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
              >
                Launch Platform
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 relative z-10 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <SparkleIcon />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">NexusAI</span>
            </div>
            <div className="flex gap-10 text-sm text-slate-500 font-semibold uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>
            <p className="text-slate-500 text-sm font-medium">© 2026 Nexus AI. Developed for the next era.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <motion.div 
      variants={fadeInUp}
      className="p-10 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-[40px] rounded-full group-hover:bg-indigo-500/10 transition-colors"></div>
      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-8 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-400 leading-relaxed font-medium text-lg">
        {description}
      </p>
    </motion.div>
  );
}

function StepCard({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group p-4"
    >
      <div className="text-6xl font-black text-white/5 absolute -top-8 -left-2 group-hover:text-indigo-500/10 transition-colors duration-500 select-none">{number}</div>
      <div className="relative z-10 space-y-4">
        <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">{title}</h3>
        <p className="text-slate-400 font-medium leading-relaxed text-lg">{description}</p>
      </div>
    </motion.div>
  );
}


