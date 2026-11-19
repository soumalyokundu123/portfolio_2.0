const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting software developer database seeding for Soumalyo Kundu...");

  // 1. Admin User
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@Soumalyo2027";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  const adminEmail = process.env.ADMIN_EMAIL || "admin@soumalyo.dev";

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      name: "Soumalyo Kundu",
      role: "SUPERADMIN",
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Soumalyo Kundu",
      role: "SUPERADMIN",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    },
  });
  console.log(`✅ Admin account initialized: ${admin.email}`);

  // 2. Profile
  const existingProfile = await prisma.profile.findFirst();
  const profileData = {
    fullName: "Soumalyo Kundu",
    title: "Software Developer | Java Backend Engineer",
    tagline: "Engineering Scalable Backends, RESTful APIs & Resilient Systems",
    bio: "Computer Science & Engineering undergraduate at MCKV Institute of Engineering (2027) focused on Java backend engineering, high-throughput RESTful services, and database-driven architectures (Spring Boot, ASP.NET Core, PostgreSQL, MongoDB, Spring Security).",
    aboutDescription:
      "I am a software engineer with strong foundations in Data Structures & Algorithms, Object-Oriented Programming, and Relational Database Design. Through technical internships at the National Informatics Centre (NIC) and ARMB, I have designed and deployed secure RESTful microservices with JWT role-based security, optimized relational schemas, and coordinated frontend-backend integrations across modern web and mobile ecosystems.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    resumeUrl: "/Soumalyo_Kundu_Resume.pdf",
    showreelUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screens-43097-large.mp4",
    showreelPoster: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80",
    yearsExperience: 2,
    projectsCompleted: 15,
    technologiesCount: 18,
    clientsCount: 8,
    email: "soumalyokundu123@gmail.com",
    phone: "+91 98300 91233",
    location: "Kolkata, India",
    isAvailable: true,
  };

  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: profileData,
    });
  } else {
    await prisma.profile.create({ data: profileData });
  }
  console.log("✅ Profile initialized.");

  // 3. Project Categories (Pure Software Engineering)
  const categoriesData = [
    { name: "Backend & Distributed Systems", slug: "backend-systems" },
    { name: "Full-Stack Web Applications", slug: "full-stack-web" },
    { name: "AI & API Integrations", slug: "ai-api-integrations" },
    { name: "Enterprise Microservices", slug: "enterprise-microservices" },
  ];

  const categories = {};
  for (const cat of categoriesData) {
    const record = await prisma.projectCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: cat,
    });
    categories[cat.slug] = record.id;
  }
  console.log("✅ Software categories initialized.");

  // 4. Exact Projects from Resume & GitHub
  const projectsData = [
    {
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
      categoryId: categories["ai-api-integrations"],
      technologies: "React.js, Node.js, Express.js, MongoDB, Google Gemini API, JWT, Multer, PDF-Parse, Zod, Vite, Axios",
    },
    {
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
      categoryId: categories["ai-api-integrations"],
      technologies: "Java, Spring Boot, React, Chrome Extension, Spring WebClient, Gemini API, Material UI, REST APIs",
    },
    {
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
      categoryId: categories["backend-systems"],
      technologies: "Java 17, Spring Boot, Spring Security, JWT, PostgreSQL, Hibernate, JPA, Swagger, Docker",
    },
    {
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
      categoryId: categories["full-stack-web"],
      technologies: "Next.js, Express.js, MongoDB, Node.js, Tailwind CSS, REST APIs",
    },
    {
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
      categoryId: categories["enterprise-microservices"],
      technologies: "ASP.NET Core, C#, Entity Framework Core, PostgreSQL, JWT Authentication, Angular, REST APIs",
    },
    {
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
      categoryId: categories["enterprise-microservices"],
      technologies: "Java 17, Spring Boot, Spring Security, JWT, PostgreSQL, Hibernate, JPA, React Native Integration",
    },
  ];

  await prisma.projectMedia.deleteMany();
  await prisma.project.deleteMany();

  for (const proj of projectsData) {
    const created = await prisma.project.create({ data: proj });
    await prisma.projectMedia.create({
      data: {
        projectId: created.id,
        type: "IMAGE",
        url: proj.thumbnail,
        caption: "Architecture & System Visual",
        orderIndex: 1,
      },
    });
  }
  console.log("✅ Exact resume projects seeded.");

  // 5. EXACT Technical Skills from Resume
  const skillCategoriesData = [
    {
      name: "Programming Languages",
      orderIndex: 1,
      skills: [
        { name: "Java (Core Java, Java 17)", proficiency: 96, featured: true },
        { name: "C++", proficiency: 90, featured: true },
        { name: "C", proficiency: 88, featured: false },
        { name: "C#", proficiency: 90, featured: true },
        { name: "Python", proficiency: 85, featured: false },
        { name: "JavaScript", proficiency: 92, featured: true },
      ],
    },
    {
      name: "Java & Backend Engineering",
      orderIndex: 2,
      skills: [
        { name: "Spring Boot", proficiency: 95, featured: true },
        { name: "ASP.NET Core", proficiency: 90, featured: true },
        { name: "Spring MVC", proficiency: 92, featured: true },
        { name: "Spring Data JPA & Hibernate", proficiency: 94, featured: true },
        { name: "REST APIs & API Design", proficiency: 96, featured: true },
        { name: "Node.js & Express.js", proficiency: 88, featured: false },
        { name: "JDBC & JPA", proficiency: 90, featured: false },
      ],
    },
    {
      name: "Security, APIs & Databases",
      orderIndex: 3,
      skills: [
        { name: "Spring Security & Role-Based Auth", proficiency: 94, featured: true },
        { name: "JWT Authentication", proficiency: 95, featured: true },
        { name: "PostgreSQL & SQL", proficiency: 94, featured: true },
        { name: "Relational Database Design", proficiency: 92, featured: true },
        { name: "MongoDB", proficiency: 88, featured: false },
        { name: "Entity Framework Core", proficiency: 90, featured: false },
        { name: "Swagger / OpenAPI & Postman", proficiency: 94, featured: true },
      ],
    },
    {
      name: "Frontend & Cloud",
      orderIndex: 4,
      skills: [
        { name: "React.js & Next.js", proficiency: 92, featured: true },
        { name: "Tailwind CSS & CSS3", proficiency: 94, featured: false },
        { name: "HTML5 & Material UI", proficiency: 90, featured: false },
        { name: "Angular (Components & HTTP)", proficiency: 86, featured: false },
        { name: "AWS (EC2, S3, Lambda, IAM)", proficiency: 84, featured: true },
      ],
    },
    {
      name: "Machine Learning & Core CS",
      orderIndex: 5,
      skills: [
        { name: "Data Structures & Algorithms", proficiency: 95, featured: true },
        { name: "Object-Oriented Programming (OOP)", proficiency: 96, featured: true },
        { name: "Database Management Systems (DBMS)", proficiency: 94, featured: true },
        { name: "Operating Systems & Networks", proficiency: 88, featured: false },
        { name: "Machine Learning & Neural Networks", proficiency: 85, featured: false },
        { name: "Git, GitHub & Maven", proficiency: 94, featured: true },
      ],
    },
  ];

  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();

  for (const catData of skillCategoriesData) {
    const cat = await prisma.skillCategory.create({
      data: { name: catData.name, orderIndex: catData.orderIndex },
    });

    for (let i = 0; i < catData.skills.length; i++) {
      const s = catData.skills[i];
      await prisma.skill.create({
        data: {
          name: s.name,
          categoryId: cat.id,
          proficiency: s.proficiency,
          featured: s.featured,
          orderIndex: i,
        },
      });
    }
  }
  console.log("✅ Exact resume skills seeded.");

  // 6. Work Experience (Verbatim from Resumes)
  const experiencesData = [
    {
      company: "National Informatics Centre (NIC)",
      position: "Backend Development Intern",
      location: "India (Govt. of India)",
      startDate: "July 2026",
      endDate: "Present",
      isCurrent: true,
      description:
        "Contributing to the development of a live Dearness Allowance (DA) Management System for public sector employee administration.",
      achievements: JSON.stringify([
        "Building and maintaining secure RESTful APIs and backend modules using ASP.NET Core, C#, Entity Framework Core, PostgreSQL, and JWT Authentication.",
        "Developing and enhancing Angular frontend modules to build responsive and user-friendly web interfaces.",
        "Integrating frontend components with backend REST APIs and handling data flow between application layers.",
        "Coordinating API integration with frontend components and ensuring transactional data integrity across service layers.",
      ]),
      technologies: "ASP.NET Core, C#, Entity Framework Core, PostgreSQL, JWT Authentication, Angular, REST APIs",
      orderIndex: 1,
    },
    {
      company: "ARMB",
      position: "Java Backend Development Intern",
      location: "Kolkata, India",
      startDate: "February 2026",
      endDate: "August 2026",
      isCurrent: false,
      description:
        "Developed backend services for a College ERP Portal using Java 17, Spring Boot, PostgreSQL, and REST APIs while collaborating with an Agile development team.",
      achievements: JSON.stringify([
        "Contributed to Schedule & Timetable Engine, implementing backend scheduling workflows for theory classes, labs, and faculty allocations.",
        "Built attendance tracking, module progress monitoring, and real-time analytics services.",
        "Implemented backend APIs via Spring Data JPA/Hibernate and collaborated with frontend teams connecting to a React Native application, ensuring seamless data exchange.",
        "Integrated Spring Security and JWT-based authentication for role-secured endpoints and services.",
      ]),
      technologies: "Java 17, Spring Boot, Spring Security, JWT, PostgreSQL, Spring Data JPA, Hibernate, REST APIs",
      orderIndex: 2,
    },
  ];

  await prisma.experience.deleteMany();
  for (const exp of experiencesData) {
    await prisma.experience.create({ data: exp });
  }
  console.log("✅ Resume work experience seeded.");

  // 7. Education (Verbatim from Resumes)
  const educationData = [
    {
      institution: "MCKV INSTITUTE OF ENGINEERING",
      degree: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      grade: "Expected Graduation: 2027 | YGPA: 9.38 (Upto 5th Semester)",
      startDate: "September 2023",
      endDate: "2027 (Expected)",
      highlights:
        "Core Studies: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, and AWS Cloud.",
      orderIndex: 1,
    },
    {
      institution: "ST. ALOYSIUS ORPHANAGE & DAY SCHOOL",
      degree: "Higher Secondary Education (ISC / ICSE)",
      field: "Science & Mathematics",
      grade: "Class 12: 91.25% | Class 10: 94.8%",
      startDate: "January 2015",
      endDate: "April 2023",
      highlights: "Strong academic foundation in Mathematics, Computer Applications, and Physics.",
      orderIndex: 2,
    },
  ];

  await prisma.education.deleteMany();
  for (const edu of educationData) {
    await prisma.education.create({ data: edu });
  }
  console.log("✅ Resume education seeded.");

  // 8. Testimonials (Focused on Software & Backend Engineering)
  const testimonialsData = [
    {
      clientName: "Project Director",
      designation: "Technical Lead",
      company: "National Informatics Centre (NIC)",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      content:
        "Soumalyo demonstrated exceptional backend rigor during the Dearness Allowance Management System implementation. His ASP.NET Core APIs and PostgreSQL data integrity checks were flawless.",
      rating: 5,
      published: true,
      orderIndex: 1,
    },
    {
      clientName: "Senior Architect",
      designation: "Engineering Lead",
      company: "ARMB Technologies",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      content:
        "Soumalyo's work on our College ERP Schedule Engine was stellar. He mastered Spring Data JPA, JWT role-based security, and complex constraint workflows with speed and precision.",
      rating: 5,
      published: true,
      orderIndex: 2,
    },
    {
      clientName: "Faculty Coordinator",
      designation: "Placement Cell In-Charge",
      company: "MCKV Institute of Engineering",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      content:
        "The InternHub portal developed by Soumalyo provided our recruiters, placement officers, and students with a dependable, secure, and intuitive recruitment management backend.",
      rating: 5,
      published: true,
      orderIndex: 3,
    },
  ];

  await prisma.testimonial.deleteMany();
  for (const test of testimonialsData) {
    await prisma.testimonial.create({ data: test });
  }
  console.log("✅ Engineering testimonials seeded.");

  // 9. Technical Blog Articles (Software Engineering & Architecture)
  const blogCatBackend = await prisma.blogCategory.upsert({
    where: { slug: "backend-architecture" },
    update: { name: "Backend Architecture" },
    create: { name: "Backend Architecture", slug: "backend-architecture" },
  });

  const blogCatFullStack = await prisma.blogCategory.upsert({
    where: { slug: "fullstack-ai" },
    update: { name: "Full-Stack & AI" },
    create: { name: "Full-Stack & AI", slug: "fullstack-ai" },
  });

  const blogPostsData = [
    {
      title: "Architecting Role-Based JWT Security & Exception Handling in Spring Boot 3",
      slug: "architecting-role-based-jwt-security-spring-boot",
      excerpt:
        "A deep architectural guide into implementing stateless JWT filter chains, custom UserDetailsService, and centralized global exception handling in Spring Boot.",
      content: `## Building Bulletproof Enterprise Security in Spring Boot

In mission-critical applications like **InternHub** and college enterprise portals, enforcing strict role-based access control (RBAC) while maintaining sub-millisecond API response times is paramount.

### 1. Stateless Authentication Filter Chain

By decoupling session state from the application server, our backend microservices scale horizontally with ease.

\`\`\`java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthenticationFilter jwtFilter) throws Exception {
        return http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/swagger-ui/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/company/**").hasAnyRole("RECRUITER", "ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
\`\`\`

### 2. Centralized Global Exception Handling
Never leak internal database stack traces to clients. A \`@RestControllerAdvice\` translates custom business exceptions into clean, deterministic HTTP responses.
`,
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      published: true,
      author: "Soumalyo Kundu",
      readingTime: "5 min read",
      tags: "Java, Spring Boot, Spring Security, JWT, PostgreSQL, REST APIs",
      seoTitle: "Role-Based JWT Security in Spring Boot | Soumalyo Kundu",
      seoDescription: "Designing stateless JWT authorization and exception handling in Spring Boot 3.",
      categoryId: blogCatBackend.id,
    },
    {
      title: "Integrating Google Gemini API with Spring WebClient for High-Throughput AI Applications",
      slug: "integrating-gemini-api-spring-webclient",
      excerpt:
        "How reactive non-blocking Spring WebClient and token prompt controls power real-time AI email assistance across Chrome extensions.",
      content: `## Reactive Spring WebClient vs RestTemplate for AI Workloads

When engineering the **AI Email Assistant**, integrating generative LLM APIs required handling high-concurrency requests without thread starvation.

### Why Reactive WebClient?
Unlike the legacy blocking \`RestTemplate\`, Spring's non-blocking \`WebClient\` handles asynchronous HTTP streaming responses using Netty event loops:
1. Low memory footprint under concurrent user bursts
2. Streaming token support
3. Built-in retry and circuit-breaking strategies

This ensures our browser extension users receive immediate, context-aware responses with minimal latency.
`,
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      published: true,
      author: "Soumalyo Kundu",
      readingTime: "6 min read",
      tags: "Java, Spring Boot, WebClient, Gemini API, AI, React, Architecture",
      seoTitle: "Spring WebClient & Gemini API Integration | Soumalyo Kundu",
      seoDescription: "Building reactive AI email assistants with Java Spring Boot and Google Gemini API.",
      categoryId: blogCatFullStack.id,
    },
  ];

  await prisma.blogPost.deleteMany();
  for (const post of blogPostsData) {
    await prisma.blogPost.create({ data: post });
  }
  console.log("✅ Software blog articles seeded.");

  // 10. Social Links (From Resumes)
  const socialLinksData = [
    { platform: "GitHub", url: "https://github.com/soumalyokundu123", iconName: "Github", orderIndex: 1 },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/soumalyo-kundu", iconName: "Linkedin", orderIndex: 2 },
    { platform: "Email", url: "mailto:soumalyokundu123@gmail.com", iconName: "Mail", orderIndex: 3 },
  ];

  await prisma.socialLink.deleteMany();
  for (const sl of socialLinksData) {
    await prisma.socialLink.create({ data: sl });
  }
  console.log("✅ Social links seeded.");

  // 11. Site Settings
  const settings = await prisma.siteSettings.findFirst();
  const settingsData = {
    siteName: "Soumalyo Kundu | Software Developer",
    siteTitle: "Soumalyo Kundu – Software Developer | Java Backend Engineer",
    siteDescription:
      "Official portfolio of Soumalyo Kundu: Computer Science undergraduate, Java Backend Engineer, and Full-Stack Developer experienced in Spring Boot, ASP.NET Core, PostgreSQL, REST APIs, and Cloud Systems.",
    keywords:
      "Soumalyo Kundu, Software Developer, Java, Spring Boot, ASP.NET Core, PostgreSQL, REST APIs, MongoDB, Next.js, Backend Engineer",
    primaryColor: "#00f2fe",
    accentColor: "#00ff87",
  };

  if (settings) {
    await prisma.siteSettings.update({ where: { id: settings.id }, data: settingsData });
  } else {
    await prisma.siteSettings.create({ data: settingsData });
  }

  console.log("🎉 Database seeding completed with exact resume credentials!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
