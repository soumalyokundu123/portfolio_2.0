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
import ContactSection from "@/components/sections/ContactSection";
import { FALLBACK_PROJECTS, FALLBACK_CATEGORIES } from "@/lib/fallbackData";

export const revalidate = 60;

export default async function HomePage() {
  let profile = null;
  let projects: any[] = [];
  let categories: any[] = [];
  let skillCategories: any[] = [];
  let experiences: any[] = [];
  let education: any[] = [];
  let socialLinks: any[] = [];

  try {
    const results = await Promise.all([
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
      prisma.socialLink.findMany({
        orderBy: { orderIndex: "asc" },
      }),
    ]);

    profile = results[0];
    projects = results[1];
    categories = results[2];
    skillCategories = results[3];
    experiences = results[4];
    education = results[5];
    socialLinks = results[6];
  } catch (err) {
    console.error("Database connection warning on HomePage:", err);
  }

  // Ensure projects and categories are always available even during DB cold-starts
  const displayProjects = projects && projects.length > 0 ? projects : FALLBACK_PROJECTS;
  const displayCategories = categories && categories.length > 0 ? categories : FALLBACK_CATEGORIES;

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
        initialProjects={displayProjects as any}
        categories={displayCategories as any}
      />

      {/* Interactive Technical Skills */}
      <SkillsSection categories={skillCategories as any} />

      {/* Work Experience Timeline */}
      <ExperienceSection experiences={experiences as any} />

      {/* Resume & Academic Education with Verified PDF */}
      <ResumeSection
        education={education as any}
        resumeUrl={profile?.resumeUrl || "/Soumalyo_Kundu_Resume.pdf"}
      />

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
