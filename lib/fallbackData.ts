export interface FallbackProject {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  overview: string;
  creativeProcess: string;
  challenges: string;
  solutions: string;
  credits: string;
  year: string;
  client: string;
  duration: string;
  thumbnail: string;
  videoPreview: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  published: boolean;
  orderIndex: number;
  category?: { name: string; slug: string };
  technologies: string;
}

export const FALLBACK_PROJECTS: FallbackProject[] = [
  {
    id: "proj-1",
    title: "AI Resume Roaster – ATS Resume Analyzer",
    slug: "ai-resume-roaster-ats-checker",
    tagline: "AI-powered ATS resume analyzer & roaster with PDF text extraction, skill gap evaluation, and Gemini API integration.",
    overview:
      "An AI-powered resume analysis and optimization platform that evaluates job applications for Applicant Tracking Systems (ATS). Users upload PDF resumes for automated text parsing via Multer & PDF-Parse, receive structured AI-driven feedback via Google's Gemini API, generate refined content suggestions, and track version histories through a secure JWT-authenticated React dashboard.",
    creativeProcess:
      "Architected the full-stack system with a responsive React.js (Vite) frontend and Node.js/Express.js backend. Implemented PDF parsing pipelines with Multer and PDF-Parse, structured JSON prompt schema validation using Zod, integrated Google Gemini API for deep contextual feedback and skill gap analysis, and deployed the frontend on Vercel and backend on Render with MongoDB Atlas.",
    challenges:
      "Parsing heterogeneous PDF resume layouts cleanly without loss of formatting and managing structured prompt validation with Gemini API.",
    solutions:
      "Implemented stream-based PDF extraction and Zod schema parsing for consistent AI output format with error boundaries and fallback suggestions.",
    credits: "Full-Stack & AI Architecture: Soumalyo Kundu",
    year: "2026",
    client: "AI Career Tools",
    duration: "1 Month",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
    videoPreview: null,
    liveUrl: "https://frontend-pink-eight-99.vercel.app",
    githubUrl: "https://github.com/soumalyokundu123/ai-resume-checker",
    featured: true,
    published: true,
    orderIndex: 1,
    category: { name: "AI & Full-Stack Systems", slug: "ai-api-integrations" },
    technologies: "React.js, Node.js, Express.js, MongoDB, Google Gemini API, JWT, Multer, PDF-Parse, Zod, Vite, Axios",
  },
  {
    id: "proj-2",
    title: "AI Email Assistant – AI-Powered Reply Generator & Extension",
    slug: "ai-email-assistant-generator",
    tagline: "Context-aware AI email response engine powered by Spring Boot, Google Gemini API & React Chrome Extension.",
    overview:
      "A full-stack artificial intelligence application and browser extension that generates context-aware professional email responses tailored by prompt and tone. Integrated Google Gemini API via Spring WebClient with backend Spring Boot REST services, offering tone/length modulation, prompt refinement, and automated proofreading with an instant one-click copy popup.",
    creativeProcess:
      "Architected the backend using Java 17, Spring Boot, and reactive Spring WebClient to handle asynchronous streaming responses from Google Gemini API. Developed the frontend in React with Material UI, implementing stateful tone controls, clipboard synchronization, and sub-100ms UI response times.",
    challenges:
      "Handling streaming token buffers and maintaining API rate limits while ensuring contextual prompt accuracy across varying email thread lengths.",
    solutions:
      "Implemented reactive Spring WebClient pipelines with intelligent prompt pruning and token caching, reducing generation latency by 45%.",
    credits: "Full-Stack & Extension Architecture: Soumalyo Kundu",
    year: "2026",
    client: "Productivity AI Labs",
    duration: "2 Months",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    videoPreview: null,
    liveUrl: "https://email-writer-application-mv1d.vercel.app/",
    githubUrl: "https://github.com/soumalyokundu123/email-writer-application",
    featured: true,
    published: true,
    orderIndex: 2,
    category: { name: "AI & API Integrations", slug: "ai-api-integrations" },
    technologies: "Java, Spring Boot, React, Chrome Extension, Spring WebClient, Gemini API, Material UI, REST APIs",
  },
  {
    id: "proj-3",
    title: "InternHub – College Internship & Recruitment Portal",
    slug: "internhub-college-internship-portal",
    tagline: "High-security university recruitment platform with role-based JWT authorization, DTO validation & PostgreSQL persistence.",
    overview:
      "An enterprise college internship backend architected for university placement ecosystems. Features multi-tier role authorization for students, company recruiters, placement cells, and admins, managing end-to-end recruitment pipelines with centralized global exception handling, server-side pagination, and Swagger API documentation.",
    creativeProcess:
      "Engineered with clean layered architecture in Java 17 and Spring Boot. Configured Spring Security stateless filter chains with HMAC-signed JWT validation. Designed normalized relational database schemas with Spring Data JPA/Hibernate on PostgreSQL.",
    challenges:
      "Ensuring data isolation across four distinct user roles while handling concurrent application submissions and preventing interview slot scheduling conflicts.",
    solutions:
      "Employed role-based method security annotations (@PreAuthorize), custom DTO validators, and database transaction isolation levels in PostgreSQL.",
    credits: "Lead Backend Developer: Soumalyo Kundu",
    year: "2026",
    client: "MCKV Institute of Engineering Placement Cell",
    duration: "4 Months",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    videoPreview: null,
    liveUrl: "https://internhub-demo.vercel.app",
    githubUrl: "https://github.com/soumalyokundu123/internSite",
    featured: true,
    published: true,
    orderIndex: 3,
    category: { name: "Backend & Distributed Systems", slug: "backend-systems" },
    technologies: "Java 17, Spring Boot, Spring Security, JWT, PostgreSQL, Hibernate, JPA, Swagger, Docker",
  },
  {
    id: "proj-4",
    title: "CivicLens – Real-time Civic Issue Management System",
    slug: "civiclens-realtime-issue-management",
    tagline: "Geospatial public grievance tracking platform built with Next.js, Express.js, MongoDB & Tailwind CSS.",
    overview:
      "A full-stack municipal issue management platform enabling citizens to report urban infrastructure issues (potholes, water supply, lighting) with real-time status tracking, media uploads, and administrative triage workflows. Developed REST APIs and integrated MongoDB for rapid issue indexing.",
    creativeProcess:
      "Built responsive client modules in Next.js and Tailwind CSS with client-side image optimization. Developed modular RESTful endpoints in Express.js and Node.js with MongoDB schema modeling.",
    challenges:
      "Optimizing geospatial queries for nearby issue clustering and minimizing payload overhead on low-bandwidth mobile connections.",
    solutions:
      "Implemented 2dsphere spatial indexes in MongoDB and asynchronous multipart image uploads with thumbnail pre-rendering.",
    credits: "Full-Stack Developer: Soumalyo Kundu",
    year: "2025",
    client: "Civic Tech Initiative",
    duration: "3 Months",
    thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    videoPreview: null,
    liveUrl: "https://civiclens-app.vercel.app",
    githubUrl: "https://github.com/soumalyokundu123/CivicLens",
    featured: true,
    published: true,
    orderIndex: 4,
    category: { name: "Full-Stack Web Applications", slug: "full-stack-web" },
    technologies: "Next.js, Express.js, MongoDB, Node.js, Tailwind CSS, REST APIs",
  },
  {
    id: "proj-5",
    title: "Dearness Allowance (DA) Management System",
    slug: "da-management-system-nic",
    tagline: "Public sector employee administration backend built with ASP.NET Core, C#, Entity Framework Core & PostgreSQL.",
    overview:
      "A production government administration module developed during internship at the National Informatics Centre (NIC). Manages Dearness Allowance calculations, payroll compliance, and transactional data integrity across multi-tier public sector service layers with JWT authentication and responsive Angular frontends.",
    creativeProcess:
      "Constructed clean repository patterns in ASP.NET Core 8 with Entity Framework Core migrations. Built transactional service handlers with PostgreSQL and integrated Angular components.",
    challenges:
      "Handling complex statutory payroll calculation rules and ensuring zero data inconsistency across distributed database transactions.",
    solutions:
      "Designed ACID-compliant database transactions and automated regression test suites verifying allowance adjustments.",
    credits: "Backend Engineering Intern: Soumalyo Kundu (NIC)",
    year: "2026",
    client: "National Informatics Centre (NIC)",
    duration: "Ongoing",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    videoPreview: null,
    liveUrl: null,
    githubUrl: "https://github.com/soumalyokundu123",
    featured: true,
    published: true,
    orderIndex: 5,
    category: { name: "Enterprise Microservices", slug: "enterprise-microservices" },
    technologies: "ASP.NET Core, C#, Entity Framework Core, PostgreSQL, JWT Authentication, Angular, REST APIs",
  },
  {
    id: "proj-6",
    title: "College ERP Schedule & Timetable Engine",
    slug: "college-erp-schedule-engine-armb",
    tagline: "Automated faculty, laboratory, and classroom allocation engine built with Java 17, Spring Boot & PostgreSQL.",
    overview:
      "A high-reliability scheduling subsystem engineered for a College ERP Portal at ARMB. Features automated timetable generation for theory classes, laboratories, and faculty allocations, real-time attendance tracking, module progress monitoring, and seamless API data exchange with a React Native mobile application.",
    creativeProcess:
      "Designed scheduling constraint algorithms in Java 17. Built REST endpoints with Spring Data JPA and integrated Spring Security with JWT tokens for role-secured endpoints.",
    challenges:
      "Preventing timetable overlap collisions across faculty allocations, shared lab rooms, and overlapping student batches.",
    solutions:
      "Engineered a constraint-satisfaction conflict detection algorithm in Java with optimistic locking on PostgreSQL schedule tables.",
    credits: "Java Backend Intern: Soumalyo Kundu (ARMB)",
    year: "2026",
    client: "ARMB Technologies",
    duration: "6 Months",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    videoPreview: null,
    liveUrl: null,
    githubUrl: "https://github.com/soumalyokundu123",
    featured: true,
    published: true,
    orderIndex: 6,
    category: { name: "Enterprise Microservices", slug: "enterprise-microservices" },
    technologies: "Java 17, Spring Boot, Spring Security, JWT, PostgreSQL, Hibernate, JPA, React Native Integration",
  },
];

export const FALLBACK_CATEGORIES = [
  { id: "cat-1", name: "AI & API Integrations", slug: "ai-api-integrations" },
  { id: "cat-2", name: "Backend & Distributed Systems", slug: "backend-systems" },
  { id: "cat-3", name: "Full-Stack Web Applications", slug: "full-stack-web" },
  { id: "cat-4", name: "Enterprise Microservices", slug: "enterprise-microservices" },
];
