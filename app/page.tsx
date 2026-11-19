import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ResumeSection from "@/components/sections/ResumeSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch real database records concurrently
  const [
    profile,
    projects,
    categories,
    skillCategories,
    experiences,
    education,
    testimonials,
    blogPosts,
    socialLinks,
  ] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.project.findMany({
      where: { published: true },
      include: { category: true, media: { orderBy: { orderIndex: "asc" } } },
      orderBy: [{ featured: "desc" }, { orderIndex: "asc" }, { createdAt: "desc" }],
    }),
    prisma.projectCategory.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.skillCategory.findMany({
      include: { skills: { orderBy: { orderIndex: "asc" } } },
      orderBy: { orderIndex: "asc" },
    }),
    prisma.experience.findMany({
      orderBy: [{ isCurrent: "desc" }, { orderIndex: "asc" }, { createdAt: "desc" }],
    }),
    prisma.education.findMany({
      orderBy: { orderIndex: "asc" },
    }),
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { orderIndex: "asc" },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      include: { category: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
    prisma.socialLink.findMany({
      orderBy: { orderIndex: "asc" },
    }),
  ]);

  return (
    <main className="min-h-screen bg-[#060709] text-white selection:bg-cyan-500 selection:text-black relative">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      {/* Hero Section with Interactive 3D WebGL Canvas */}
      <HeroSection
        name={profile?.fullName}
        title={profile?.title}
        tagline={profile?.tagline}
        bio={profile?.bio}
      />

      {/* About Section */}
      <AboutSection profile={profile as any} />

      {/* Featured Projects with Live Category Filtering */}
      <FeaturedProjects
        initialProjects={projects as any}
        categories={categories as any}
      />

      {/* Interactive Technical Skills */}
      <SkillsSection categories={skillCategories as any} />

      {/* Work Experience Timeline */}
      <ExperienceSection experiences={experiences as any} />

      {/* Resume & Academic Education */}
      <ResumeSection
        education={education as any}
        resumeUrl={profile?.resumeUrl}
      />

      {/* Endorsements Carousel */}
      <TestimonialsSection testimonials={testimonials as any} />

      {/* Technical Blog */}
      <BlogSection posts={blogPosts as any} />

      {/* Interactive Contact Form */}
      <ContactSection
        email={profile?.email}
        phone={profile?.phone || undefined}
        location={profile?.location}
      />

      {/* Creative Studio Footer */}
      <Footer
        email={profile?.email}
        phone={profile?.phone || undefined}
        location={profile?.location}
        socialLinks={socialLinks as any}
      />
    </main>
  );
}
