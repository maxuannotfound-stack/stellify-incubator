import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  LineChart,
  MessageCircle,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react";
import "./styles.css";

const navy = "#052447";
const gold = "#b08646";

function Button({ children, className = "", variant = "primary", ...props }) {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function StellifyLogo({ footer = false }) {
  return (
    <div className={`stellify-logo ${footer ? "footer-logo" : ""}`}>
      <div className="logo-border" />
      <div className="logo-text">
        <div className="logo-main">STELLIFY</div>
        <div className="logo-tagline">Dare to dream</div>
      </div>
    </div>
  );
}

function App() {
  const [level, setLevel] = useState("Starter");

  const levels = {
    Starter: {
      title: "Starter: Understand Finance",
      desc: "Learn basic business lending, borrowing responsibility, common finance terms, and risk concepts in plain language.",
      modules: ["What is business lending?", "Debt vs investment", "Basic risk awareness"],
    },
    Growth: {
      title: "Growth: Prepare for Lending",
      desc: "Build readiness by understanding income, cash flow, repayment ability, and lender expectations.",
      modules: ["Finance readiness checklist", "Cash flow and repayment", "Documents lenders may request"],
    },
    Expansion: {
      title: "Expansion: Use Finance Strategically",
      desc: "Explore how finance can support business expansion while keeping risk and long-term sustainability in mind.",
      modules: ["Strategic borrowing", "Growth planning", "Risk and decision-making"],
    },
  };

  const supportCards = [
    [BookOpen, "Structured Learning", "Step-by-step courses for every stage of your business journey."],
    [MessageCircle, "AI Finance Assistant", "Ask questions and get clear answers based on Stellify’s own guidance."],
    [ClipboardList, "Finance Readiness Check", "Assess your business readiness and understand what lenders may need."],
    [Users, "Expert Network Support", "Connect with trusted professionals and business service providers."],
    [LineChart, "Grow With Confidence", "Strengthen your business, manage risk and access the right funding."],
  ];

  const serviceCards = [
    [ClipboardList, "Finance Readiness Check", "Get a clear snapshot of your business situation before seeking funding."],
    [BookOpen, "Business Finance Learning", "Understand lending, risk, repayment and lender expectations in plain language."],
    [MessageCircle, "AI Guided Q&A", "Ask basic finance questions and receive reliable answers based on Stellify’s process."],
    [ShieldCheck, "Risk & Responsibility", "Learn how to borrow responsibly and avoid taking on unsuitable finance."],
    [Network, "Expert Referral Support", "Access support from trusted professionals in IT, accounting, automation and IP."],
    [LineChart, "Growth Funding Pathway", "Explore funding options that support cash flow, equipment, innovation and expansion."],
  ];

  const stats = [
    ["12+", "Years of small business experience"],
    ["500+", "Client discussions and support opportunities"],
    ["Nationwide", "Connected professional network"],
    ["20", "Years of financial experience"],
  ];

  return (
    <div className="site">
      <header className="header">
        <div className="header-inner">
          <StellifyLogo />
          <nav className="nav">
            <a href="#home" className="active">Home</a>
            <a href="#about">About Us</a>
            <a href="#learning">Learning Hub <ChevronDown size={16} /></a>
            <a href="#assistant">AI Assistant</a>
            <a href="#network">Expert Network</a>
            <a href="#resources">Resources <ChevronDown size={16} /></a>
            <a href="#contact">FAQs</a>
            <a href="#contact">Contact</a>
          </nav>
          <Button>Book Your Free Session</Button>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="hero-image" />
        <div className="container hero-content">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="hero-text"
          >
            <div className="brand-word">STELLIFY</div>
            <h1>BUSINESS INCUBATOR</h1>
            <h2>Learn finance. Understand risk.<br />Grow with confidence.</h2>
            <p>
              A structured learning and support platform for SMEs and new business clients. Build financial confidence, strengthen your business, and access the right funding to grow.
            </p>
            <div className="hero-actions">
              <Button variant="gold">Start Your Learning Journey</Button>
              <Button variant="outline">Check Your Finance Readiness</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="section intro-section">
        <div className="container center">
          <h2 className="section-title">How Stellify Incubator Supports You</h2>
          <p className="section-subtitle">Everything you need to understand finance and grow your business with confidence.</p>
          <div className="support-grid">
            {supportCards.map(([Icon, title, desc]) => (
              <Card key={title} className="support-card">
                <Icon size={58} strokeWidth={1.7} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section audience-section">
        <div className="container center">
          <h2 className="section-title">Who the Incubator Can Help</h2>
          <p className="section-subtitle wide">
            This incubator is designed for business owners, new businesses and SMEs who want to understand finance before making major funding decisions. It focuses on business lending, risk awareness, cash flow support, asset finance and growth planning.
          </p>
          <div className="service-grid">
            {serviceCards.map(([Icon, title, desc]) => (
              <Card key={title} className="service-card">
                <Icon size={62} strokeWidth={1.8} />
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
                <Button>Discover More</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section help-section">
        <div className="container help-grid">
          <div>
            <h2>How We Can Help You</h2>
            <h3>Empowering you to make informed finance decisions</h3>
            <p>
              Stellify Incubator helps business clients regain clarity and control by simplifying finance education and guiding them through structured support. The result is less uncertainty, stronger financial understanding and more confidence before speaking with a broker.
            </p>
            <ul>
              <li><b>Understand your finances:</b> use a readiness check to review income, expenses, debt and funding purpose.</li>
              <li><b>Explore business lending options:</b> learn how funding can support cash flow, assets and business growth.</li>
              <li><b>Support your ongoing journey:</b> plan strategically, understand risk and prepare for personalised advice.</li>
            </ul>
            <Button>Explore Services</Button>
          </div>
          <div className="illustration-card">
            <div className="illustration-circle">
              <ShieldCheck size={92} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container center">
          <p className="stats-intro">Together, let’s make business ideas more finance-ready. Stellify brings together:</p>
          <div className="stats-grid">
            {stats.map(([num, label]) => (
              <div key={label}>
                <div className="stat-number">{num}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
          <div className="stats-list">
            <ul>
              <li><b>Extensive lender and professional network</b> to help clients find more suitable support.</li>
              <li><b>Transparent learning pathway</b> that reduces confusion before financial decisions.</li>
              <li><b>Human-led guidance</b> for complex questions after AI-supported learning.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="learning" className="section learning-section">
        <div className="container two-col">
          <div>
            <p className="eyebrow">Learning Hub</p>
            <h2>Tiered courses for different business stages</h2>
            <p>
              The incubator uses simple learning levels so clients can understand finance before making decisions. This supports trust, financial literacy and better client readiness.
            </p>
            <div className="level-buttons">
              {Object.keys(levels).map((item) => (
                <Button key={item} onClick={() => setLevel(item)} variant={item === level ? "primary" : "light"}>{item}</Button>
              ))}
            </div>
          </div>
          <Card className="level-card">
            <h3>{levels[level].title}</h3>
            <p>{levels[level].desc}</p>
            <div className="module-list">
              {levels[level].modules.map((module) => (
                <div key={module} className="module-item">
                  <CheckCircle2 size={22} />
                  <span>{module}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section id="assistant" className="section assistant-section">
        <div className="container two-col center-items">
          <Card className="chat-card">
            <div className="chat-header"><Bot /> Stellify AI Finance Assistant</div>
            <div className="chat-body">
              <div className="chat-bubble user">I am not sure whether business lending is too risky for my company.</div>
              <div className="chat-bubble ai">Lending always involves risk. A good first step is to check your income stability, repayment ability and purpose of funding. Would you like to complete a readiness check?</div>
              <div className="chat-actions">
                <Button variant="light">Start Readiness Check</Button>
                <Button>Ask Another Question</Button>
              </div>
            </div>
          </Card>
          <div>
            <p className="eyebrow">Trust-first AI</p>
            <h2>AI supports the process, but does not replace people</h2>
            <p>
              The AI tool is designed to use Stellify’s own educational content and process knowledge, not random online information. It helps with basic questions and screening, while complex advice remains human-led.
            </p>
          </div>
        </div>
      </section>

      <section id="network" className="network-section">
        <div className="container">
          <p className="eyebrow light-text">Business Support Network</p>
          <h2>More than a broker: a support platform for business growth</h2>
          <div className="network-grid">
            {["IT Support", "Accounting", "Business Automation", "Intellectual Property"].map((item) => (
              <div key={item} className="network-card">
                <Network />
                <h3>{item}</h3>
                <p>Connect with trusted professionals through Stellify’s referral network.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="resources" className="section journey-section">
        <div className="container">
          <p className="eyebrow">Client Journey</p>
          <h2>A clearer path from interest to consultation</h2>
          <div className="journey-grid">
            {[
              ["1", "Learn", "Complete short finance modules."],
              ["2", "Check", "Use the readiness checklist."],
              ["3", "Ask", "Get AI-assisted basic guidance."],
              ["4", "Prepare", "Understand documents and risk."],
              ["5", "Consult", "Book a human-led Stellify session."],
            ].map(([num, title, desc]) => (
              <div key={num} className="journey-card">
                <div className="journey-number">{num}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section start-section">
        <div className="container center">
          <h2>How To Get Started</h2>
          <div className="steps-list">
            <p><b>1. Choose your pathway</b> — select a learning level, complete a readiness check, or book a time with Stellify.</p>
            <p><b>2. Complete a guided check</b> — review your business situation, funding purpose and potential risk before direct consultation.</p>
            <p><b>3. Take the next step</b> — receive clearer guidance and prepare for a human-led conversation with a finance professional.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="cta-section">
        <div className="container cta-box">
          <h2>Dream It! Plan It! Stellify It!</h2>
          <p>
            Start with a simple learning pathway, check your finance readiness, and connect with Stellify when you are ready for personalised support.
          </p>
          <Button>Begin the Incubator Journey <ArrowRight size={18} /></Button>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <StellifyLogo footer />
          <div>
            <h3>Quick Links</h3>
            <p>Learning Hub</p>
            <p>Finance Readiness Check</p>
            <p>AI Finance Assistant</p>
            <p>Expert Network</p>
          </div>
          <div>
            <h3>Contact</h3>
            <p>Book a free session with Stellify</p>
            <p>Website-first incubator concept</p>
          </div>
        </div>
        <div className="container disclaimer">
          This prototype is designed to provide factual education only. It does not provide financial or investment advice. Clients should speak to an accredited finance professional before making borrowing decisions.
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
