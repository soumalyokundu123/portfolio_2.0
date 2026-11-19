import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const ContactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(150),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000),
});

export const ProjectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  tagline: z.string().min(2, "Tagline is required"),
  overview: z.string().min(10, "Overview is required"),
  creativeProcess: z.string().optional().nullable(),
  challenges: z.string().optional().nullable(),
  solutions: z.string().optional().nullable(),
  credits: z.string().optional().nullable(),
  year: z.string().default("2026"),
  client: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  thumbnail: z.string().url("Valid thumbnail image URL required"),
  videoPreview: z.string().optional().nullable(),
  liveUrl: z.string().optional().nullable(),
  githubUrl: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  orderIndex: z.number().default(0),
  categoryId: z.string().min(1, "Category is required"),
  technologies: z.string().min(2, "Technologies list is required"),
});

export const SkillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  categoryId: z.string().min(1, "Skill category is required"),
  proficiency: z.number().min(1).max(100).default(90),
  iconName: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  orderIndex: z.number().default(0),
});

export const ExperienceSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position is required"),
  location: z.string().optional().nullable(),
  startDate: z.string().min(2, "Start date is required"),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  description: z.string().min(10, "Description is required"),
  achievements: z.string().optional().nullable(),
  technologies: z.string().optional().nullable(),
  orderIndex: z.number().default(0),
});

export const TestimonialSchema = z.object({
  clientName: z.string().min(2, "Client name is required"),
  designation: z.string().min(2, "Designation is required"),
  company: z.string().min(2, "Company is required"),
  avatarUrl: z.string().optional().nullable(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  rating: z.number().min(1).max(5).default(5),
  published: z.boolean().default(true),
  orderIndex: z.number().default(0),
});

export const BlogPostSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  excerpt: z.string().min(10, "Excerpt is required"),
  content: z.string().min(20, "Content is required"),
  coverImage: z.string().url("Valid cover image URL required"),
  published: z.boolean().default(true),
  author: z.string().default("Soumalyo Kundu"),
  readingTime: z.string().default("5 min read"),
  tags: z.string().min(2, "Tags required"),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  categoryId: z.string().min(1, "Category is required"),
});

export const SiteSettingsSchema = z.object({
  siteName: z.string().min(1),
  siteTitle: z.string().min(1),
  siteDescription: z.string().min(10),
  keywords: z.string().min(2),
  primaryColor: z.string().default("#00f2fe"),
  accentColor: z.string().default("#00ff87"),
  customCss: z.string().optional().nullable(),
  analyticsId: z.string().optional().nullable(),
});

export const ProfileSchema = z.object({
  fullName: z.string().min(2),
  title: z.string().min(2),
  tagline: z.string().min(2),
  bio: z.string().min(10),
  aboutDescription: z.string().min(10),
  avatarUrl: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
  showreelUrl: z.string().optional().nullable(),
  showreelPoster: z.string().optional().nullable(),
  yearsExperience: z.number().min(0),
  projectsCompleted: z.number().min(0),
  technologiesCount: z.number().min(0),
  clientsCount: z.number().min(0),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  location: z.string().default("Kolkata, India"),
  isAvailable: z.boolean().default(true),
});
