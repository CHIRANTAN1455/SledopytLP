import { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Bot, Database, Server, Ticket, MapPin, Mail, Phone, Send, Menu, X, ChevronDown, Terminal, MousePointer2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Toaster, toast } from "sonner";
import { ParticleCanvas } from "./components/ui/particle-canvas";
import { SingleImageCard } from "./components/ui/image-tiles";
import AgentsPage from "./AgentsPage";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Team members data
const teamMembers = [
  {
    name: "Chirantan Pradhan",
    role: "CoFounder & CTO",
    image: "https://customer-assets.emergentagent.com/job_ai-solutions-hub-49/artifacts/wlnhmrnh_Chirantan%20Pradhan.jpg"
  },
  {
    name: "Udit Bhaskar",
    role: "CoFounder",
    image: "https://customer-assets.emergentagent.com/job_ai-solutions-hub-49/artifacts/4gv8ubgw_Udit%20Bhasker.jpg"
  },
  {
    name: "Shivyaa Sharma",
    role: "Tech Lead",
    image: "https://customer-assets.emergentagent.com/job_ai-solutions-hub-49/artifacts/jgvop2ci_Shaivyaa%20Sharma.png"
  },
  {
    name: "Dev Arora",
    role: "Lead AI/ML Engineer",
    image: "https://customer-assets.emergentagent.com/job_ai-solutions-hub-49/artifacts/2qzkt1k8_Dev%20Arora.jpg"
  },
  {
    name: "Hardeep Singh",
    role: "Product & Marketing",
    image: "https://customer-assets.emergentagent.com/job_ai-solutions-hub-49/artifacts/r9zwm7c6_Hardeep%20Singh.jpg"
  }
];

// Services data
const services = [
  {
    title: "AI Agents & Bots",
    description: "Autonomous digital workers that never sleep. Build intelligent agents that handle complex tasks, automate workflows, and interact naturally with your customers.",
    icon: Bot,
    span: "md:col-span-2 md:row-span-2"
  },
  {
    title: "Smart CRM",
    description: "Predictive customer relationship management powered by AI.",
    icon: Database,
    span: "md:col-span-1 md:row-span-1"
  },
  {
    title: "Server Control",
    description: "Messaging-based infrastructure command and control.",
    icon: Server,
    span: "md:col-span-1 md:row-span-1"
  },
  {
    title: "Ticket Management",
    description: "Auto-triage, intelligent routing, and AI-powered resolution systems for seamless support.",
    icon: Ticket,
    span: "md:col-span-2 md:row-span-1"
  }
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a 
            href="/" 
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-testid="logo"
          >
            <img 
              src="https://customer-assets.emergentagent.com/job_ai-solutions-hub-49/artifacts/khguvbti_logo.png" 
              alt="Sledopyt AI Logo" 
              className="h-10 w-10"
            />
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-white">Sledopyt</span>
              <span className="text-blue-500"> AI</span>
            </span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="text-white/60 hover:text-white transition-colors duration-200" data-testid="nav-services">
              Services
            </button>
            <Link to="/agents" className="text-white/60 hover:text-white transition-colors duration-200" data-testid="nav-agents">
              Agents
            </Link>
            <button onClick={() => scrollToSection('team')} className="text-white/60 hover:text-white transition-colors duration-200" data-testid="nav-team">
              Team
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-white/60 hover:text-white transition-colors duration-200" data-testid="nav-contact">
              Contact
            </button>
            <Button 
              onClick={() => scrollToSection('contact')} 
              className="bg-white hover:bg-white/90 text-black font-semibold px-6"
              data-testid="nav-cta"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            className="md:hidden pt-4 pb-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('services')} className="text-white/60 hover:text-white text-left py-2" data-testid="mobile-nav-services">
                Services
              </button>
              <Link to="/agents" className="text-white/60 hover:text-white text-left py-2" data-testid="mobile-nav-agents">
                Agents
              </Link>
              <button onClick={() => scrollToSection('team')} className="text-white/60 hover:text-white text-left py-2" data-testid="mobile-nav-team">
                Team
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-white/60 hover:text-white text-left py-2" data-testid="mobile-nav-contact">
                Contact
              </button>
              <Button 
                onClick={() => scrollToSection('contact')} 
                className="bg-white hover:bg-white/90 text-black w-full font-semibold"
                data-testid="mobile-nav-cta"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

// Hero Section with Particle Effect
const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      data-testid="hero-section"
    >
      {/* Particle Background */}
      <ParticleCanvas accentColor="#4285F4" />

      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-sm text-white/60">The Architects of Intelligence</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-tight tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Intelligence,</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Architected.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Sledopyt AI builds the autonomous systems that power the next generation of enterprise. From intelligent agents to server control, we navigate the chaos of data.
          </p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              onClick={scrollToContact}
              size="lg" 
              className="bg-white hover:bg-white/90 text-black font-semibold px-8 py-6 text-lg group"
              data-testid="hero-cta-primary"
            >
              Initialize Protocol
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-white/20 text-white/80 hover:bg-white/10 px-8 py-6 text-lg"
              data-testid="hero-cta-secondary"
            >
              Explore Services
              <ChevronDown className="ml-2" size={20} />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-mono">Interact</span>
        <MousePointer2 size={16} />
      </motion.div>
    </section>
  );
};

// Deployment Section
const DeploymentSection = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-black to-slate-950 relative overflow-hidden" data-testid="deployment-section">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm text-green-400 font-mono">Deploy with Confidence</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">One Command.</span>
              <br />
              <span className="text-blue-400">Infinite Scale.</span>
            </h2>
            
            <p className="text-white/50 text-lg mb-8 leading-relaxed">
              Our AI models deploy seamlessly to your infrastructure. Whether it's cloud, on-premise, or hybrid - watch your intelligent systems come alive with a single command.
            </p>

            {/* Terminal commands */}
            <div className="bg-black rounded-xl p-4 border border-white/10 font-mono text-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-white/30 ml-2 text-xs">terminal</span>
              </div>
              <div className="space-y-2 text-white/70">
                <p><span className="text-green-400">$</span> sledopyt deploy --model gpt-agent-v3</p>
                <p className="text-white/40">→ Initializing neural pathways...</p>
                <p className="text-white/40">→ Connecting to inference cluster...</p>
                <p className="text-green-400">✓ Model deployed successfully</p>
                <p className="text-blue-400">⚡ Endpoint: api.sledopytai.com/v3/agent</p>
              </div>
            </div>
          </motion.div>

          {/* Terminal Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
              <video 
                src="https://customer-assets.emergentagent.com/job_ai-solutions-hub-49/artifacts/n9qwmbrj_sledo.mp4" 
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-auto min-h-[300px] object-cover"
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Floating badge */}
            <motion.div 
              className="absolute -bottom-4 -right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-sm">99.9% Uptime</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-slate-950 relative" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">Our</span>
            <span className="text-blue-400"> Solutions</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Enterprise-grade AI solutions designed for the modern business landscape
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`rounded-2xl p-6 md:p-8 ${service.span} bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300`}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              data-testid={`service-card-${index}`}
            >
              <div className="h-full flex flex-col">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                  <service.icon className="text-blue-400" size={28} />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/50 leading-relaxed flex-grow">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Team Section
const TeamSection = () => {
  return (
    <section id="team" className="py-24 md:py-32 bg-black relative overflow-hidden" data-testid="team-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">Meet the</span>
            <span className="text-blue-400"> Team</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            The minds behind the intelligence
          </p>
        </motion.div>

        {/* All team members in one line */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <SingleImageCard
              key={member.name}
              image={member.image}
              name={member.name}
              role={member.role}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-slate-950 relative" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">Let's</span>
              <span className="text-blue-400"> Connect</span>
            </h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              Ready to transform your business with AI? Get in touch and let's discuss how we can help architect your intelligent future.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-blue-400" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Our Location</h4>
                  <p className="text-white/50">
                    WeWork Hub71, Al Khatem Tower,<br />
                    ADGM Square, Al Maryah Island,<br />
                    Abu Dhabi, UAE
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-blue-400" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email Us</h4>
                  <p className="text-white/50">hello@sledopytai.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-blue-400" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Call Us</h4>
                  <p className="text-white/50">+971 509482406</p>
                </div>
              </div>
            </div>

            {/* Terminal Style Map */}
            <div className="mt-10 rounded-2xl overflow-hidden border border-white/10 bg-black">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-white/30 text-xs ml-2 font-mono">location.sh</span>
              </div>
              {/* Terminal content */}
              <div className="p-4 font-mono text-sm">
                <div className="text-white/40 mb-2">$ sledopyt --locate headquarters</div>
                <div className="text-green-400 mb-3">→ Establishing secure connection...</div>
                
                {/* ASCII-style map */}
                <div className="text-blue-400/70 text-xs leading-tight mb-4 overflow-hidden">
                  <pre className="whitespace-pre">
{`    ╔══════════════════════════════════════╗
    ║     ARABIAN GULF                     ║
    ║  ～～～～～～～～～～～～～～～～～～  ║
    ║      ·  ·  · ABU DHABI ·  ·  ·       ║
    ║         ┌─────────────┐              ║
    ║    ╭────┤  AL MARYAH  ├────╮         ║
    ║    │    │   ISLAND    │    │         ║
    ║    │    │   ◉ HQ      │    │         ║
    ║    ╰────┤  [WEWORK]   ├────╯         ║
    ║         └─────────────┘              ║
    ║                UAE                   ║
    ╚══════════════════════════════════════╝`}
                  </pre>
                </div>

                <div className="space-y-1 text-white/50">
                  <p><span className="text-blue-400">LAT:</span> 24.4539° N</p>
                  <p><span className="text-blue-400">LNG:</span> 54.3773° E</p>
                  <p><span className="text-blue-400">LOC:</span> WeWork Hub71, Al Khatem Tower</p>
                  <p><span className="text-blue-400">ZONE:</span> ADGM Square, Al Maryah Island</p>
                </div>
                
                <div className="mt-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-green-400 text-xs">ONLINE • Accepting visitors</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-2xl p-8 md:p-10 bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-white mb-6">Send us a message</h3>
              
              <form 
                action="https://formsubmit.co/hello@sledopytai.com" 
                method="POST"
                className="space-y-6"
              >
                {/* FormSubmit configuration */}
                <input type="hidden" name="_subject" value="New Contact from Sledopyt AI Website" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="bg-black/50 border-white/20 text-white placeholder:text-white/30 focus:border-blue-500"
                    data-testid="contact-name-input"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="bg-black/50 border-white/20 text-white placeholder:text-white/30 focus:border-blue-500"
                    data-testid="contact-email-input"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    required
                    rows={5}
                    className="bg-black/50 border-white/20 text-white placeholder:text-white/30 focus:border-blue-500 resize-none"
                    data-testid="contact-message-input"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-white hover:bg-white/90 text-black font-semibold py-6 text-lg"
                  data-testid="contact-submit-btn"
                >
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <Send size={20} />
                  </span>
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Section
const Footer = () => {
  return (
    <footer className="py-12 bg-black border-t border-white/10" data-testid="footer">
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
            &copy; {new Date().getFullYear()} Sledopyt AI. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors duration-200" data-testid="footer-privacy">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors duration-200" data-testid="footer-terms">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Home Page Component
const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <HeroSection />
      <DeploymentSection />
      <ServicesSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="dark">
      <BrowserRouter>
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155'
            }
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agents" element={<AgentsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
