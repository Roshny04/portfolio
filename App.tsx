import { useState, useEffect, useMemo } from 'react';
import { 
  Mail, Phone, MapPin, Linkedin, Github, ExternalLink, 
  Cpu, Zap, Car, BarChart3, Code2, Globe, Database, 
  BrainCircuit, ShieldAlert, BatteryCharging, 
  Moon, Sun, Menu, X, ChevronRight, Send, Download,
  Award, Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: 'AI' | 'Engineering';
  tech: string[];
  github?: string;
  details: {
    problemStatement: string;
    solutionBuilt: string;
    implementation: string[];
    skillsGained: string[];
  };
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI-Driven Smart Grid X Pro",
    subtitle: "National Smart Powerthon Hackathon – 1st Prize",
    category: 'Engineering',
    tech: ["MARL", "XAI", "PINN", "Python"],
    github: "https://github.com/Roshny04",
    details: {
      problemStatement: "Modern power grids face frequent disruptions due to equipment faults, cyberattacks, and extreme weather conditions. Traditional grids lack intelligent mechanisms to detect faults quickly and recover automatically, leading to power instability and outages.",
      solutionBuilt: "Developed Smart Grid X Pro, an AI-powered intelligent grid management system capable of real-time fault detection, autonomous self-healing response, cyber-risk mitigation, and weather-adaptive load management.",
      implementation: [
        "Led a team during a 30-hour national hackathon to design the system architecture.",
        "Implemented Multi-Agent Reinforcement Learning (MARL) to enable autonomous grid decision making.",
        "Integrated Explainable AI (XAI) to improve transparency of model predictions.",
        "Used Physics-Informed Neural Networks (PINN) to incorporate real power system constraints into the learning model.",
        "Designed algorithms to analyze grid data and automatically detect faults and initiate recovery mechanisms."
      ],
      skillsGained: ["Smart Grid Systems", "Artificial Intelligence", "Multi-Agent Reinforcement Learning (MARL)", "Explainable AI (XAI)", "Physics-Informed Neural Networks (PINN)", "Power System Stability", "Energy System Optimization", "Team Leadership"]
    }
  },
  {
    id: 2,
    title: "AI-Based Predictive Maintenance System",
    subtitle: "Intelligent Industrial Reliability",
    category: 'AI',
    tech: ["Machine Learning", "Predictive Analytics", "Python"],
    github: "https://github.com/Roshny04",
    details: {
      problemStatement: "Electrical equipment failures can cause unexpected downtime, costly repairs, and reduced system reliability. Traditional maintenance strategies are reactive and fail to predict failures before they occur.",
      solutionBuilt: "Developed an AI-based predictive maintenance system that analyzes equipment condition data to predict potential failures and optimize maintenance schedules.",
      implementation: [
        "Collected and processed condition monitoring data from electrical equipment.",
        "Applied machine learning techniques to detect patterns indicating equipment degradation.",
        "Built predictive models that estimate the probability of equipment failure.",
        "Implemented data analysis methods to plan preventive maintenance before breakdowns occur."
      ],
      skillsGained: ["Artificial Intelligence", "Machine Learning", "Predictive Analytics", "Power Systems Monitoring", "Data Modeling", "Reliability Engineering"]
    }
  },
  {
    id: 3,
    title: "Cyberattack Impact Analysis on Connected Autonomous Vehicle Traffic",
    subtitle: "Machine Learning Traffic Simulation",
    category: 'Engineering',
    tech: ["Python", "Simulation", "Random Forest"],
    github: "https://github.com/Roshny04",
    details: {
      problemStatement: "Connected autonomous vehicles rely on wireless communication (V2V and V2I) to exchange information such as speed, distance, and acceleration. Cyberattacks can manipulate this data, causing traffic instability, oscillations, and congestion.",
      solutionBuilt: "Developed a machine learning–based simulation framework to analyze how cyberattacks affect traffic stability in connected vehicle environments.",
      implementation: [
        "Simulated vehicle behavior using Python.",
        "Modeled traffic parameters such as headway distance, relative velocity, vehicle acceleration, jerk, communication range, and cyberattack intensity.",
        "Used NumPy for numerical computations and Matplotlib for traffic behavior visualization.",
        "Trained a Random Forest Classifier to predict whether traffic conditions remain stable or become unstable under cyberattack scenarios.",
        "Analyzed how manipulated communication signals influence traffic flow and stability."
      ],
      skillsGained: ["Python Programming", "Traffic Simulation", "Machine Learning", "Random Forest Algorithm", "Data Analysis", "Connected Vehicle Communication (V2V & V2I)", "Cyber-Physical System Security"]
    }
  },
  {
    id: 4,
    title: "Electric Vehicle Design & Development – EV Saksham",
    subtitle: "Hands-on Industrial EV Construction",
    category: 'Engineering',
    tech: ["Powertrain", "Battery Systems", "Vehicle Integration"],
    github: "https://github.com/Roshny04",
    details: {
      problemStatement: "Transitioning to sustainable mobility requires practical expertise in EV powertrain and system integration. Traditional academic learning often lacks the hands-on exposure needed for real-world vehicle development.",
      solutionBuilt: "Gained hands-on industrial experience through the EV Saksham Electric Vehicle Design & Development Program, where our team built an electric vehicle from scratch.",
      implementation: [
        "Worked on EV architecture including motor integration and battery pack configuration.",
        "Executed controller connections and overall vehicle system assembly.",
        "Gained practical exposure to EV powertrain systems and battery management concepts.",
        "Practiced collaborative engineering and real-world vehicle development workflows."
      ],
      skillsGained: ["Electric Vehicle Technology", "EV Powertrain Systems", "Battery Systems", "Vehicle System Integration", "Sustainable Mobility", "Team Collaboration"]
    }
  }
];

const SKILLS = [
  { category: "Programming", items: ["Python", "JavaScript", "C"], icon: <Code2 size={20} /> },
  { category: "Web Development", items: ["React", "HTML", "CSS", "Node.js"], icon: <Globe size={20} /> },
  { 
    category: "AI & Data", 
    items: [
      "Machine Learning Fundamentals",
      "Predictive Analytics",
      "Multi-Agent Reinforcement Learning (MARL)",
      "Explainable AI (XAI)",
      "Physics-Informed Neural Networks (PINN)",
      "Prompt Engineering for LLMs",
      "AI-Assisted Research"
    ], 
    icon: <BrainCircuit size={20} /> 
  },
  { category: "Engineering Domains", items: ["Smart Grid Systems", "Autonomous Vehicles", "Energy Analytics"], icon: <Zap size={20} /> }
];

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'All' | 'AI' | 'Engineering'>('All');
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // --- Effects ---
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') setIsDark(false);
    else document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Helpers ---
  const filteredProjects = useMemo(() => {
    if (filter === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === filter);
  }, [filter]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-grid">
      {/* Background Blobs */}
      <div className="blob w-96 h-96 bg-blue-500 top-[-10%] left-[-10%]" />
      <div className="blob w-96 h-96 bg-indigo-500 bottom-[10%] right-[-10%]" />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-display font-bold tracking-tighter flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">JR</div>
            <span>Jilella Roshny</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Internship', 'Projects', 'Skills', 'Certifications', 'Engagement', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
            ))}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 glass rounded-lg hover:text-blue-600 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsDark(!isDark)} className="p-2 glass rounded-lg">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 glass rounded-lg">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {['About', 'Internship', 'Projects', 'Skills', 'Certifications', 'Engagement', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="section-container pt-40 md:pt-52 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 glass rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 mb-6"
        >
          Available for Internships & Collaborations
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Building <span className="gradient-text">Intelligent Systems</span> <br className="hidden md:block" />
          for a Smarter Future
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          Jilella Roshny — EEE Student specializing in AI-driven smart energy technologies, 
          intelligent transportation, and data-driven infrastructure solutions.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a href="#projects" className="btn-primary flex items-center gap-2">
            View Projects <ChevronRight size={18} />
          </a>
          <a href="#contact" className="btn-secondary flex items-center gap-2">
            Contact Me
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 animate-bounce"
        >
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-slate-400 rounded-full" />
          </div>
        </motion.div>
      </header>

      {/* About Section */}
      <section id="about" className="section-container">
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              I am an Electrical and Electronics Engineering student at Chaitanya Bharati Institute of Technology (CBIT'27) 
              with a deep passion for the intersection of power systems and artificial intelligence. My work focuses on 
              building the next generation of resilient infrastructure—from smart grids that self-heal to autonomous 
              vehicles that communicate securely.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Beyond engineering, I am an avid full-stack learner, bridging the gap between hardware-level 
                energy systems and high-level software analytics. I thrive on solving complex problems using 
                predictive analytics and machine learning.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Interests", value: "Smart Grids, AVs, AI" },
                { label: "Education", value: "B.Tech in EEE, CBIT'27" },
                { label: "Location", value: "Hyderabad, India" },
                { label: "Focus", value: "Predictive Analytics" }
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Internship Section */}
      <section id="internship" className="section-container">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Industrial Experience</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Practical exposure to large-scale engineering operations and power systems.
          </p>
        </motion.div>

        <motion.div 
          {...fadeInUp}
          className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
              <Briefcase size={32} />
            </div>
            <div>
              <div className="inline-block px-3 py-1 bg-blue-600/10 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
                Industrial Internship
              </div>
              <h3 className="text-2xl font-bold mb-2">Industrial Intern</h3>
              <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-4">Bharat Heavy Electricals Limited (BHEL)</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Gained industrial exposure at BHEL to power equipment manufacturing, generators, transformers, and real-world power system operations, including maintenance practices and electrical safety standards.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-container">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            A selection of my work in AI-driven smart systems and energy analytics.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {['All', 'AI', 'Engineering'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'glass hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="project-card group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-blue-600/10 rounded-xl text-blue-600 dark:text-blue-400">
                    {project.category === 'AI' ? <BrainCircuit size={24} /> : <Zap size={24} />}
                  </div>
                  <div className="p-2 glass rounded-lg text-slate-400 group-hover:text-blue-600 transition-colors">
                    <ChevronRight size={20} />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">{project.subtitle}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-8 md:p-12 relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 glass rounded-full hover:text-blue-600 transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-600/10 rounded-xl text-blue-600 dark:text-blue-400">
                    {selectedProject.category === 'AI' ? <BrainCircuit size={32} /> : <Zap size={32} />}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold leading-tight">{selectedProject.title}</h2>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{selectedProject.subtitle}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Problem Statement</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedProject.details.problemStatement}</p>
                    </section>
                    
                    <section>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Solution Built</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedProject.details.solutionBuilt}</p>
                    </section>

                    <section>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Skills Gained</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.details.skillsGained.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="space-y-8">
                    <section>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">How I Implemented It</h3>
                      <ul className="space-y-4">
                        {selectedProject.details.implementation.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            <div className="mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </section>

                    {selectedProject.github && (
                      <a 
                        href={selectedProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2"
                      >
                        View on GitHub <Github size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-container">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            My toolkit spans the entire stack, from low-level engineering domains to high-level AI frameworks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((skill, i) => (
            <motion.div 
              key={i}
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl"
            >
              <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                {skill.icon}
              </div>
              <h3 className="font-bold text-lg mb-4">{skill.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, j) => (
                  <span key={j} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="section-container">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Certifications</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Professional certifications and specialized training programs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Introduction to Artificial Intelligence",
              issuer: "Infosys Springboard",
              icon: <BrainCircuit size={24} />
            },
            {
              title: "Web Development Certification",
              issuer: "Udemy",
              icon: <Globe size={24} />
            },
            {
              title: "AWS Job Simulation Program",
              issuer: "Forage",
              icon: <Database size={24} />
            }
          ].map((cert, i) => (
            <motion.div 
              key={i}
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl border border-white/10 hover:border-blue-600/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                {cert.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{cert.title}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">{cert.issuer}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Industry & Academic Engagement Section */}
      <section id="engagement" className="section-container">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Industry & Academic Engagement</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Bridging the gap between academic research and corporate excellence.
          </p>
        </motion.div>

        <div className="grid gap-8">
          <motion.div 
            {...fadeInUp}
            className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-blue-600/10 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
                  Industry Research Project
                </div>
                <h3 className="text-2xl font-bold mb-4">Corporate Culture & Employee Excellence Study</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Conducted a structured survey-based organizational study by interacting with professionals from Deloitte 
                  to analyze corporate culture, employee engagement strategies, leadership dynamics, and career growth pathways.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Key Contributions</h4>
                    <ul className="space-y-3">
                      {[
                        "Designed structured questionnaires for data collection",
                        "Analyzed qualitative and quantitative insights",
                        "Evaluated employee motivation and organizational performance indicators",
                        "Strengthened skills in analytical reporting"
                      ].map((contribution, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                          <div className="mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                          {contribution}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-center md:justify-end">
                    <div className="p-8 glass rounded-3xl border border-white/5 bg-blue-600/5">
                      <BarChart3 size={64} className="text-blue-600/40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-container">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
              I'm always open to discussing research opportunities, AI projects, or smart infrastructure 
              collaborations. Feel free to reach out through any of these channels.
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Mail size={20} />, label: "Email", value: "roshnyroselin@gmail.com", href: "mailto:roshnyroselin@gmail.com" },
                { icon: <Linkedin size={20} />, label: "LinkedIn", value: "Jilella Roshny", href: "https://www.linkedin.com/in/roshny-j-a62555347" },
                { icon: <Github size={20} />, label: "GitHub", value: "Roshny04", href: "https://github.com/Roshny04" },
                { icon: <MapPin size={20} />, label: "Location", value: "Hyderabad, India", href: null }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4 p-6 glass rounded-3xl border border-white/10 hover:border-blue-600/50 transition-all">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {item.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-blue-600 transition-colors break-all">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-container border-t border-slate-200 dark:border-slate-800 text-center">
        <div className="flex justify-center gap-6 mb-8">
          {[
            { icon: <Github size={20} />, href: "https://github.com/Roshny04" },
            { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/roshny-j-a62555347" },
            { icon: <Mail size={20} />, href: "mailto:roshnyroselin@gmail.com" }
          ].map((social, i) => (
            <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl hover:text-blue-600 transition-colors">
              {social.icon}
            </a>
          ))}
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          © {new Date().getFullYear()} Jilella Roshny. Built with React, Tailwind & Framer Motion.
        </p>
      </footer>
    </div>
  );
}
