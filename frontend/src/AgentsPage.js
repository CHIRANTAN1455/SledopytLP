import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Bot, 
  Phone, 
  MessageSquare, 
  Zap, 
  Brain, 
  Mic, 
  Play, 
  Pause,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Globe,
  ChevronRight,
  Terminal,
  Cpu,
  Network,
  Activity,
  Linkedin,
  MapPin,
  Mail,
  Calendar,
  Ticket,
  HelpCircle,
  UserPlus,
  Star,
  Share2,
  Search,
  Newspaper,
  DollarSign,
  FileText,
  Receipt,
  FileCheck,
  Wifi,
  Database,
  AlertTriangle,
  GitBranch,
  MousePointer2
} from "lucide-react";
import { Button } from "./components/ui/button";
import { ParticleCanvas } from "./components/ui/particle-canvas";

// Automation data with icons
const automations = [
  { title: "Lead Enrichment from LinkedIn", icon: Linkedin, category: "Sales" },
  { title: "Google Maps Lead Scraper", icon: MapPin, category: "Sales" },
  { title: "Cold Outreach Personalization", icon: Mail, category: "Sales" },
  { title: "Meeting Assistant", icon: Calendar, category: "Productivity" },
  { title: "AI Support Ticket Triage", icon: Ticket, category: "Support" },
  { title: "Auto-Reply for Common FAQs", icon: HelpCircle, category: "Support" },
  { title: "Customer Onboarding Sequence", icon: UserPlus, category: "Support" },
  { title: "Automated Review Request", icon: Star, category: "Marketing" },
  { title: "Social Media Repurposing", icon: Share2, category: "Marketing" },
  { title: "SEO Keyword Monitor", icon: Search, category: "Marketing" },
  { title: "Newsletter Aggregator", icon: Newspaper, category: "Marketing" },
  { title: "Ad Spend Alert System", icon: DollarSign, category: "Finance" },
  { title: "AI Resume Screener", icon: FileText, category: "HR" },
  { title: "Expense Management via Telegram", icon: Receipt, category: "Finance" },
  { title: "Automatic Invoice Reminder", icon: Receipt, category: "Finance" },
  { title: "Contract Expiry Tracker", icon: FileCheck, category: "Operations" },
  { title: "Website Uptime & SSL Monitor", icon: Wifi, category: "DevOps" },
  { title: "Automated Database Backups", icon: Database, category: "DevOps" },
  { title: "Slack Phishing Link Scanner", icon: AlertTriangle, category: "Security" },
  { title: "GitHub Issue to Project Management", icon: GitBranch, category: "DevOps" }
];

// Navigation
const AgentsNavigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group" data-testid="agents-logo">
            <img 
              src="https://customer-assets.emergentagent.com/job_ai-solutions-hub-49/artifacts/khguvbti_logo.png" 
              alt="Sledopyt AI Logo" 
              className="h-10 w-10"
            />
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-white group-hover:text-blue-400 transition-colors">Sledopyt</span>
              <span className="text-blue-500"> AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="hidden sm:flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 group" 
              data-testid="back-home"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
            <Button 
              className="bg-white hover:bg-white/90 text-black font-semibold px-6"
              data-testid="agents-cta"
            >
              Deploy Agent
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Hero with Particle Effect
const AgentsHero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'AGENTIC_AUTOMATIONS_v3.0';
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" data-testid="agents-hero">
      {/* Particle Background */}
      <ParticleCanvas accentColor="#4285F4" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-white/60 text-sm font-mono">{displayText}<span className="animate-pulse">_</span></span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              Intelligence,
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              Architected.
            </span>
            <br />
            <span className="text-white/30 text-4xl lg:text-5xl">AI Agents at Scale.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 mb-10 max-w-xl leading-relaxed">
            Deploy autonomous AI agents that navigate the chaos of data. 20+ ready-to-deploy automations for every business need.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg"
              className="bg-white hover:bg-white/90 text-black font-semibold px-8 py-6 text-lg group"
              data-testid="hero-deploy-btn"
            >
              Initialize Protocol
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link to="/#contact">
              <Button 
                variant="outline"
                size="lg"
                className="border-white/20 text-white/80 hover:bg-white/10 px-8 py-6 text-lg"
                data-testid="hero-contact-btn"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-mono">Interact</span>
        <MousePointer2 size={16} />
      </motion.div>
    </section>
  );
};

// Moving Tiles Automation Showcase
const AutomationShowcase = () => {
  const row1 = automations.slice(0, 10);
  const row2 = automations.slice(10, 20);

  return (
    <section className="py-24 bg-black relative overflow-hidden" data-testid="automation-showcase">
      {/* Divider lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 mb-6">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-white/60 text-sm font-mono">20+ READY-TO-DEPLOY</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-4 tracking-tight">
            Agentic Automations
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Pre-built AI agents for every business need. Deploy in minutes, not months.
          </p>
        </motion.div>
      </div>

      {/* Moving tiles - Row 1 (Left to Right) */}
      <div className="relative mb-6 overflow-hidden">
        <motion.div 
          className="flex gap-4"
          animate={{ x: [0, -2000] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {[...row1, ...row1, ...row1].map((item, index) => (
            <div key={`row1-${index}`} className="flex-shrink-0 group">
              <div className="w-72 h-24 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 p-4 flex items-center gap-4 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm leading-tight truncate">{item.title}</p>
                  <span className="text-xs text-white/40 font-mono">{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Moving tiles - Row 2 (Right to Left) */}
      <div className="relative overflow-hidden">
        <motion.div 
          className="flex gap-4"
          animate={{ x: [-2000, 0] }}
          transition={{ 
            duration: 35, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {[...row2, ...row2, ...row2].map((item, index) => (
            <div key={`row2-${index}`} className="flex-shrink-0 group">
              <div className="w-72 h-24 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 p-4 flex items-center gap-4 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                  <item.icon className="w-6 h-6 text-white/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm leading-tight truncate">{item.title}</p>
                  <span className="text-xs text-white/40 font-mono">{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Automations', value: '20+', icon: Bot },
            { label: 'Businesses Served', value: '500+', icon: Globe },
            { label: 'Tasks Automated/Day', value: '1M+', icon: Zap },
            { label: 'Avg. Time Saved', value: '40hrs/wk', icon: Clock }
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-center hover:border-blue-500/30 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white font-mono">{stat.value}</p>
              <p className="text-sm text-white/40">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Use Cases Grid
const UseCasesGrid = () => {
  const categories = [
    { name: 'Sales & Lead Gen', items: automations.filter(a => a.category === 'Sales') },
    { name: 'Customer Support', items: automations.filter(a => a.category === 'Support') },
    { name: 'Marketing', items: automations.filter(a => a.category === 'Marketing') },
    { name: 'Finance & Ops', items: automations.filter(a => ['Finance', 'Operations'].includes(a.category)) },
    { name: 'DevOps & Security', items: automations.filter(a => ['DevOps', 'Security'].includes(a.category)) },
    { name: 'HR & Productivity', items: automations.filter(a => ['HR', 'Productivity'].includes(a.category)) },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black to-slate-950 relative" data-testid="use-cases-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-4 tracking-tight">
            By Category
          </h2>
          <p className="text-white/40 text-lg">
            Find the perfect automation for your department
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="rounded-xl bg-white/5 border border-white/10 p-6 hover:border-blue-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <span className="text-xs text-blue-400 font-mono bg-blue-500/10 px-2 py-1 rounded">
                  {category.items.length} agents
                </span>
              </div>
              <div className="space-y-2">
                {category.items.map((item) => (
                  <div key={item.title} className="flex items-center gap-2 text-white/50 text-sm">
                    <item.icon className="w-4 h-4 text-blue-400/70" />
                    <span className="truncate">{item.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Voice Demo Section
const VoiceAgentDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden" data-testid="voice-agent-section">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 mb-6">
              <Phone className="w-4 h-4 text-blue-400" />
              <span className="text-white/60 text-sm font-mono">VOICE_AGENT_DEMO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-4 tracking-tight">
              Voice Agents in Action
            </h2>

            <p className="text-white/40 text-lg mb-6 leading-relaxed">
              Our Voice Agents handle calls naturally, schedule appointments, and qualify leads—all autonomously. Here's a real estate inquiry demo.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              {['Natural Speech', 'Multi-language', 'CRM Sync', '24/7 Available'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm">
                  {tag}
                </span>
              ))}
            </div>

            <Button
              onClick={togglePlay}
              className="bg-blue-500 hover:bg-blue-400 text-white"
              data-testid="play-demo-btn"
            >
              {isPlaying ? <Pause className="mr-2 w-4 h-4" /> : <Play className="mr-2 w-4 h-4" />}
              {isPlaying ? 'Pause Demo' : 'Play Demo'}
            </Button>
          </motion.div>

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-white/30 text-xs ml-2 font-mono">voice_demo.mp4</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-white/20'}`}></div>
              </div>

              <video 
                ref={videoRef}
                src="https://customer-assets.emergentagent.com/job_ai-solutions-hub-49/artifacts/sxl4bngd_EstateAgent.mp4"
                className="w-full h-auto"
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls
                preload="metadata"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// CTA Section
const AgentsCTA = () => {
  return (
    <section className="py-32 bg-black relative" data-testid="agents-cta-section">
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-white/60 text-sm font-mono">START_AUTOMATING</span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-6 tracking-tighter">
            Ready to<br />Automate?
          </h2>
          
          <p className="text-white/40 text-lg mb-10 max-w-2xl mx-auto">
            Get started with any automation in under 24 hours
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#contact">
              <Button 
                size="lg"
                className="bg-white hover:bg-white/90 text-black font-semibold px-10 py-6 text-lg group"
                data-testid="agents-contact-btn"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/">
              <Button 
                variant="outline"
                size="lg"
                className="border-white/20 text-white/80 hover:bg-white/10 px-10 py-6 text-lg"
                data-testid="agents-home-btn"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const AgentsFooter = () => {
  return (
    <footer className="py-8 bg-black border-t border-white/10" data-testid="agents-footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_ai-solutions-hub-49/artifacts/khguvbti_logo.png" 
              alt="Sledopyt AI Logo" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-white">Sledopyt</span>
            <span className="text-xl font-bold text-blue-500">AI</span>
          </div>

          <p className="text-white/30 text-sm font-mono">
            &copy; {new Date().getFullYear()} SLEDOPYT_AI // ALL_RIGHTS_RESERVED
          </p>

          <div className="flex items-center gap-6">
            <Link to="/" className="text-white/40 hover:text-white transition-colors text-sm">
              Home
            </Link>
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Agents Page
export default function AgentsPage() {
  return (
    <div className="bg-black min-h-screen">
      <AgentsNavigation />
      <AgentsHero />
      <AutomationShowcase />
      <UseCasesGrid />
      <VoiceAgentDemo />
      <AgentsCTA />
      <AgentsFooter />
    </div>
  );
}
