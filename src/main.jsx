import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Gavel,
  HandCoins,
  LineChart,
  Megaphone,
  MessageCircle,
  Network,
  Settings,
  ShieldCheck,
  Shield,
  Users,
} from "lucide-react";
import "./styles.css";

const navy = "#052447";
const gold = "#b08646";

function Button({ children, className = "", variant = "primary", ...props }) {
  const { type, ...rest } = props;
  return (
    <button
      type={type ?? "button"}
      className={`btn btn-${variant} ${className}`}
      {...rest}
    >
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
  const [activeCourse, setActiveCourse] = useState("Starter");

  const [readiness, setReadiness] = useState({
    businessName: "",
    industry: "",
    monthlyRevenue: "",
    monthlyExpenses: "",
    existingDebt: "No",
    fundingPurpose: "",
    fundingAmount: "",
  });

  const [chatMessages, setChatMessages] = useState([
    { role: "user", text: "I am not sure whether business lending is too risky for my company." },
    {
      role: "ai",
      text: "Lending always involves risk. A good first step is to check your income stability, repayment ability and purpose of funding. Would you like to complete a readiness check?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatStatus, setChatStatus] = useState("idle"); // idle | sending | error
  const [chatError, setChatError] = useState("");

  const levels = {
    Starter: {
      title: "Starter: Understand Finance",
      desc: "Learn basic business lending, borrowing responsibility, common finance terms, and risk concepts in plain language.",
      modules: ["What is business lending?", "Debt vs investment", "Basic risk awareness"],
      mentor: { name: "Mentor: Emma", role: "Small Business Coach" },
      priceAUD: 0,
    },
    Growth: {
      title: "Growth: Prepare for Lending",
      desc: "Build readiness by understanding income, cash flow, repayment ability, and lender expectations.",
      modules: ["Finance readiness checklist", "Cash flow and repayment", "Documents lenders may request"],
      mentor: { name: "Mentor: Daniel", role: "Finance Readiness Specialist" },
      priceAUD: 149,
    },
    Expansion: {
      title: "Expansion: Use Finance Strategically",
      desc: "Explore how finance can support business expansion while keeping risk and long-term sustainability in mind.",
      modules: ["Strategic borrowing", "Growth planning", "Risk and decision-making"],
      mentor: { name: "Mentor: Priya", role: "Growth & Strategy Advisor" },
      priceAUD: 299,
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

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const setCourseAndScroll = (courseKey) => {
    setLevel(courseKey);
    setActiveCourse(courseKey);
    scrollTo("learning");
  };

  const updateReadiness = (field, value) => {
    setReadiness((prev) => ({ ...prev, [field]: value }));
  };

  const computeReadiness = () => {
    const revenue = Number(readiness.monthlyRevenue || 0);
    const expenses = Number(readiness.monthlyExpenses || 0);
    const amount = Number(readiness.fundingAmount || 0);
    const margin = revenue - expenses;

    let score = 0;
    if (revenue > 0) score += 20;
    if (margin > 0) score += 20;
    if (margin > revenue * 0.15) score += 15;
    if (readiness.existingDebt === "No") score += 15;
    if (readiness.fundingPurpose.trim().length >= 8) score += 15;
    if (amount > 0 && margin > 0 && amount <= margin * 12) score += 15;
    return Math.min(100, score);
  };

  const readinessScore = computeReadiness();

  const sendChat = async () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", text }]);
    setChatStatus("sending");
    setChatError("");

    try {
      const messagesForApi = [
        ...chatMessages.map((m) => ({
          role: m.role === "ai" ? "assistant" : "user",
          content: m.text,
        })),
        { role: "user", content: text },
      ];

      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messagesForApi,
          tier: "free",
        }),
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        throw new Error(data?.error || `Request failed (${resp.status})`);
      }

      const reply = data?.text || "(No response)";
      setChatMessages((prev) => [...prev, { role: "ai", text: reply }]);
      setChatStatus("idle");
    } catch (e) {
      setChatStatus("error");
      setChatError(
        "AI is not connected yet. If you are running locally, /api/chat only works after deploying to Vercel (or using Vercel Dev)."
      );
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "（连接失败）当前环境还没连上真实 AI。部署到 Vercel 并配置 GROQ_API_KEY 后就会变成真实对话。",
        },
      ]);
      console.error(e);
    }
  };

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
          <Button onClick={() => scrollTo("contact")}>Book Your Free Session</Button>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="hero-image" aria-hidden="true">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            poster="https://images.unsplash.com/photo-1545044846-351ba102b6d5?q=80&w=1600&auto=format&fit=crop"
            onLoadedMetadata={(e) => {
              // Some browsers block autoplay; try play and silently ignore errors.
              e.currentTarget.play?.().catch?.(() => {});
            }}
          >
            <source src="/media/stellify-hero.mp4" type="video/mp4" />
          </video>
        </div>
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
              <Button variant="gold" onClick={() => scrollTo("learning")}>
                Start Your Learning Journey
              </Button>
              <Button variant="outline" onClick={() => scrollTo("readiness")}>
                Check Your Finance Readiness
              </Button>
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
                <Button
                  onClick={() => {
                    if (title === "Finance Readiness Check") return scrollTo("readiness");
                    if (title === "Business Finance Learning") return scrollTo("learning");
                    if (title === "AI Guided Q&A") return scrollTo("assistant");
                    if (title === "Risk & Responsibility") return setCourseAndScroll("Starter");
                    if (title === "Expert Referral Support") return scrollTo("network");
                    if (title === "Growth Funding Pathway") return setCourseAndScroll("Expansion");
                    return scrollTo("learning");
                  }}
                >
                  Discover More
                </Button>
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
            <Button onClick={() => scrollTo("resources")}>Explore Services</Button>
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
            <div className="course-grid">
              {Object.keys(levels).map((key) => (
                <Card
                  key={key}
                  className={`course-card ${activeCourse === key ? "active" : ""}`}
                >
                  <div className="course-mentor">
                    <div className={`mentor-avatar mentor-${key.toLowerCase()}`} />
                    <div>
                      <div className="mentor-name">{levels[key].mentor.name}</div>
                      <div className="mentor-role">{levels[key].mentor.role}</div>
                    </div>
                  </div>
                  <div className="course-title">{key}</div>
                  <div className="course-price">
                    {levels[key].priceAUD === 0 ? "Free" : `AUD $${levels[key].priceAUD}`}
                  </div>
                  <Button
                    variant={activeCourse === key ? "primary" : "light"}
                    className="course-cta"
                    onClick={() => {
                      setActiveCourse(key);
                      setLevel(key);
                    }}
                  >
                    View modules
                  </Button>
                </Card>
              ))}
            </div>
            <div className="level-buttons">
              {Object.keys(levels).map((item) => (
                <Button
                  key={item}
                  onClick={() => {
                    setLevel(item);
                    setActiveCourse(item);
                  }}
                  variant={item === level ? "primary" : "light"}
                >
                  {item}
                </Button>
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

      <section id="readiness" className="section readiness-section">
        <div className="container two-col center-items">
          <div>
            <p className="eyebrow">Finance Readiness Check</p>
            <h2>Get a quick snapshot before seeking funding</h2>
            <p>
              This is a demo checklist to guide a conversation. It is not financial advice. Enter approximate figures in AUD.
            </p>
            <div className="readiness-score">
              <div className="score-number">{readinessScore}/100</div>
              <div className="score-label">
                {readinessScore >= 70
                  ? "Good starting point"
                  : readinessScore >= 45
                    ? "Needs a bit more clarity"
                    : "Early stage — start with basics"}
              </div>
            </div>
            <div className="readiness-tips">
              <p>
                Next steps: clarify funding purpose, confirm monthly cash flow, and prepare basic documents (bank statements, BAS, financials).
              </p>
              <Button onClick={() => scrollTo("assistant")}>Ask the AI Assistant</Button>
            </div>
          </div>
          <Card className="readiness-card">
            <h3>Quick inputs (AUD)</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="readiness-form"
            >
              <label>
                Business name
                <input
                  value={readiness.businessName}
                  onChange={(e) => updateReadiness("businessName", e.target.value)}
                  placeholder="e.g. Ocean Coffee Co."
                />
              </label>
              <label>
                Industry
                <input
                  value={readiness.industry}
                  onChange={(e) => updateReadiness("industry", e.target.value)}
                  placeholder="e.g. Retail / Trades / Hospitality"
                />
              </label>
              <div className="readiness-row">
                <label>
                  Monthly revenue (AUD)
                  <input
                    inputMode="numeric"
                    value={readiness.monthlyRevenue}
                    onChange={(e) => updateReadiness("monthlyRevenue", e.target.value)}
                    placeholder="e.g. 25000"
                  />
                </label>
                <label>
                  Monthly expenses (AUD)
                  <input
                    inputMode="numeric"
                    value={readiness.monthlyExpenses}
                    onChange={(e) => updateReadiness("monthlyExpenses", e.target.value)}
                    placeholder="e.g. 18000"
                  />
                </label>
              </div>
              <label>
                Existing business debt?
                <select
                  value={readiness.existingDebt}
                  onChange={(e) => updateReadiness("existingDebt", e.target.value)}
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </label>
              <label>
                Funding purpose
                <input
                  value={readiness.fundingPurpose}
                  onChange={(e) => updateReadiness("fundingPurpose", e.target.value)}
                  placeholder="e.g. equipment purchase, working capital..."
                />
              </label>
              <label>
                Desired amount (AUD)
                <input
                  inputMode="numeric"
                  value={readiness.fundingAmount}
                  onChange={(e) => updateReadiness("fundingAmount", e.target.value)}
                  placeholder="e.g. 60000"
                />
              </label>
              <Button variant="gold" onClick={() => scrollTo("assistant")}>
                Discuss with AI
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section id="assistant" className="section assistant-section">
        <div className="container two-col center-items">
          <Card className="chat-card">
            <div className="chat-header"><Bot /> Stellify AI Finance Assistant</div>
            <div className="chat-body">
              <div className="chat-stream">
                {chatMessages.map((m, idx) => (
                  <div key={idx} className={`chat-bubble ${m.role}`}>
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="chat-actions">
                <Button variant="light" onClick={() => scrollTo("readiness")}>
                  Start Readiness Check
                </Button>
                <Button
                  onClick={() => {
                    const input = document.getElementById("chat-input");
                    input?.focus();
                  }}
                >
                  Ask Another Question
                </Button>
              </div>
              <form
                className="chat-input-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  sendChat();
                }}
              >
                <input
                  id="chat-input"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a question (demo mode)…"
                />
                <Button type="submit" disabled={chatStatus === "sending"}>
                  {chatStatus === "sending" ? "Sending..." : "Send"}
                </Button>
              </form>
              {chatStatus === "error" && chatError ? (
                <div className="chat-error">{chatError}</div>
              ) : null}
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
          <p className="eyebrow light-text">Partner Network</p>
          <h2>Meet Our Partner Network</h2>
          <div className="network-grid">
            {[
              [BarChart3, "Accounting"],
              [Settings, "Automation"],
              [Shield, "IT Support"],
              [Gavel, "Legal"],
              [Users, "Intellectual Property"],
              [Megaphone, "Marketing"],
              [HandCoins, "Funding Specialists"],
            ].map(([Icon, title]) => (
              <div key={title} className="network-card">
                <Icon />
                <h3>{title}</h3>
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
          <Button onClick={() => scrollTo("learning")}>
            Begin the Incubator Journey <ArrowRight size={18} />
          </Button>
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
