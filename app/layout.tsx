import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soumalyo Kundu | Software Developer & Java Backend Engineer",
  description:
    "Official portfolio of Soumalyo Kundu: Computer Science undergraduate at MCKV Institute of Engineering, Java Backend Engineer with experience at NIC and ARMB. Experienced in Spring Boot, ASP.NET Core, PostgreSQL, REST APIs, and full-stack software development.",
  keywords: [
    "Soumalyo Kundu",
    "Software Developer",
    "Java Backend Engineer",
    "Java 17",
    "Spring Boot",
    "Spring Security",
    "ASP.NET Core",
    "PostgreSQL",
    "RESTful APIs",
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "MongoDB",
    "Next.js",
    "MCKV Institute of Engineering",
  ],
  authors: [{ name: "Soumalyo Kundu", url: "https://github.com/soumalyokundu123" }],
  creator: "Soumalyo Kundu",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Soumalyo Kundu — Software Developer Portfolio",
    title: "Soumalyo Kundu | Software Developer & Java Backend Engineer",
    description:
      "Engineering scalable backends, RESTful APIs, and resilient full-stack systems. Experienced in Java 17, Spring Boot, ASP.NET Core, and PostgreSQL.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Soumalyo Kundu Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soumalyo Kundu | Software Developer & Java Backend Engineer",
    description: "Engineering scalable backends, RESTful APIs, and resilient full-stack systems.",
    images: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Soumalyo Kundu",
    jobTitle: "Software Developer | Java Backend Engineer",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    email: "soumalyokundu123@gmail.com",
    telephone: "+91 98300 91233",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "MCKV Institute of Engineering",
    },
    sameAs: [
      "https://github.com/soumalyokundu123",
      "https://www.linkedin.com/in/soumalyo-kundu",
    ],
    knowsAbout: [
      "Java (Core Java, Java 17)",
      "Spring Boot",
      "Spring Security",
      "RESTful API Development",
      "ASP.NET Core",
      "PostgreSQL & Relational Database Design",
      "Hibernate & Spring Data JPA",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "React.js & Next.js",
      "MongoDB",
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#060709] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
