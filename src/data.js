export const personalInfo = {
  name: "Media Pons",
  title: "Senior Full-Stack Developer & UI/UX Specialist",
  tagline: "Building high-performance web applications with exceptional aesthetics and pixel-perfect design.",
  about: "We are a passionate software engineering and digital studio with 6+ years of experience designing and developing scalable web apps, interactive digital experiences, and modern user interfaces.",
  location: "San Francisco, CA & Remote",
  email: "info@media-pons.de",
  availability: "Available for Freelance & Full-time Roles",
  socials: {
    github: "https://github.com/emre-edu-tech"
  },
  stats: [
    { label: "Years Experience", value: "6+" },
    { label: "Projects Completed", value: "45+" },
    { label: "Happy Clients", value: "30+" },
    { label: "Code Commits", value: "2.4k+" }
  ]
};

export const skills = [
  {
    category: "Frontend Excellence",
    icon: `<svg class="w-6 h-6 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
    items: [
      { name: "JavaScript (ES6+)", level: 95, icon: "⚡" },
      { name: "Tailwind CSS v3", level: 98, icon: "🎨" },
      { name: "HTML5 / Semantic Web", level: 95, icon: "🌐" },
      { name: "CSS3 / Modern Layouts", level: 92, icon: "📐" },
      { name: "TypeScript", level: 88, icon: "📘" },
      { name: "React / Component Design", level: 90, icon: "⚛️" }
    ]
  },
  {
    category: "Backend & Systems",
    icon: `<svg class="w-6 h-6 text-accent-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/></svg>`,
    items: [
      { name: "Node.js & Express", level: 90, icon: "🟢" },
      { name: "RESTful API Design", level: 94, icon: "🔌" },
      { name: "PostgreSQL / SQL", level: 85, icon: "🐘" },
      { name: "MongoDB & NoSQL", level: 84, icon: "🍃" },
      { name: "Authentication / Auth0", level: 88, icon: "🔒" },
      { name: "Serverless & Cloud Functions", level: 82, icon: "☁️" }
    ]
  },
  {
    category: "Design & Workflow",
    icon: `<svg class="w-6 h-6 text-accent-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>`,
    items: [
      { name: "UI/UX & Wireframing", level: 92, icon: "✨" },
      { name: "Git & Version Control", level: 96, icon: "🌿" },
      { name: "Responsive Web Design", level: 98, icon: "📱" },
      { name: "Performance Optimization", level: 90, icon: "🚀" },
      { name: "Figma to Code Pipeline", level: 94, icon: "🖌️" },
      { name: "Web Accessibility (a11y)", level: 88, icon: "♿" }
    ]
  }
];

export const projects = [
  {
    id: "apex-ai",
    title: "ApexAI - Intelligence Dashboard",
    category: "Full Stack",
    categoryKey: "fullstack",
    image: "assets/project_saas_dashboard.png",
    description: "An enterprise AI analytics suite delivering real-time metrics, automated data visualization, and predictive insights in a dark glassmorphic UI.",
    highlights: [
      "Real-time WebSocket data stream visualization",
      "Custom responsive chart components",
      "Sub-100ms API response latency",
      "Dark theme glassmorphism UI system"
    ],
    tags: ["JavaScript", "Tailwind CSS v3", "Node.js", "Chart.js", "WebSockets"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: "novalux",
    title: "NovaLux - Luxury Fashion Web App",
    category: "Web Apps",
    categoryKey: "webapps",
    image: "assets/project_ecommerce_app.png",
    description: "A minimal, ultra-fast luxury web store featuring dynamic product filtering, seamless checkout drawer, and micro-animations.",
    highlights: [
      "Integrated instant client-side search & filtering",
      "Optimized Core Web Vitals (LCP < 0.8s)",
      "Interactive 3D product view modal",
      "Fluid responsive layout across mobile and desktop"
    ],
    tags: ["Vanilla JS", "Tailwind CSS v3", "HTML5", "LocalStorage API"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: "pulsepay",
    title: "PulsePay - FinTech Mobile Wallet",
    category: "Mobile & Web",
    categoryKey: "mobile",
    image: "assets/project_finance_mobile.png",
    description: "Modern dark-mode financial asset manager enabling users to track portfolios, convert currencies, and monitor market trends effortlessly.",
    highlights: [
      "Interactive multi-currency converter widget",
      "Biometric-inspired security indicator",
      "Clean dark UI with emerald & cyan accents",
      "Comprehensive mobile touch controls"
    ],
    tags: ["JavaScript", "Tailwind CSS v3", "Crypto API", "PWA"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: "aether-ui",
    title: "Aether UI - Modern Design System",
    category: "UI/UX",
    categoryKey: "uiux",
    image: "assets/project_saas_dashboard.png",
    description: "A lightweight, accessible dark-mode UI component library built exclusively with Tailwind CSS v3 and Vanilla JS without heavy dependencies.",
    highlights: [
      "Over 40+ accessible UI components",
      "Zero build step lightweight JS modal & dropdown logic",
      "Strict WAI-ARIA compliance",
      "Custom color theme generator script"
    ],
    tags: ["Tailwind CSS v3", "Vanilla JS", "Design Systems", "CSS3"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false
  }
];

export const testimonials = [
  {
    id: 1,
    quote: "Media Pons turned our complex dashboard vision into an extraordinary, lightning-fast reality. The attention to detail in dark mode aesthetics and responsive design exceeded every expectation.",
    name: "Sarah Jenkins",
    role: "Chief Technology Officer",
    company: "TechPulse Inc.",
    avatar: "assets/testimonial_avatar_1.png",
    rating: 5
  },
  {
    id: 2,
    quote: "Working with Media Pons was a game-changer for our launch. Their deep mastery of Tailwind CSS and clean Vanilla JS engineering meant our web app loads instantly and feels incredibly modern.",
    name: "Marcus Vance",
    role: "Founder & CEO",
    company: "CloudScale Solutions",
    avatar: "assets/testimonial_avatar_2.png",
    rating: 5
  },
  {
    id: 3,
    quote: "Exceptional UI taste combined with rock-solid frontend craftsmanship. He delivers clean code, great communication, and designs that truly captivate users.",
    name: "Elena Rostova",
    role: "Product Design Director",
    company: "Studio X",
    avatar: "assets/testimonial_avatar_1.png",
    rating: 5
  }
];
