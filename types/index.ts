export interface Profile {
  id: string;
  fullName: string;
  title: string;
  tagline: string;
  bio: string;
  aboutDescription: string;
  avatarUrl?: string | null;
  resumeUrl?: string | null;
  showreelUrl?: string | null;
  showreelPoster?: string | null;
  yearsExperience: number;
  projectsCompleted: number;
  technologiesCount: number;
  clientsCount: number;
  email: string;
  phone?: string | null;
  location: string;
  isAvailable: boolean;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  projects?: Project[];
  _count?: { projects: number };
}

export interface ProjectMedia {
  id: string;
  projectId: string;
  type: string;
  url: string;
  caption?: string | null;
  orderIndex: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  overview: string;
  creativeProcess?: string | null;
  challenges?: string | null;
  solutions?: string | null;
  credits?: string | null;
  year: string;
  client?: string | null;
  duration?: string | null;
  thumbnail: string;
  videoPreview?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  published: boolean;
  orderIndex: number;
  categoryId: string;
  category?: ProjectCategory;
  technologies: string;
  media?: ProjectMedia[];
  nextProject?: { title: string; slug: string; thumbnail: string } | null;
  prevProject?: { title: string; slug: string; thumbnail: string } | null;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  categoryId: string;
  category?: SkillCategory;
  proficiency: number;
  iconName?: string | null;
  featured: boolean;
  orderIndex: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  orderIndex: number;
  skills?: Skill[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description: string;
  achievements?: string | null;
  technologies?: string | null;
  orderIndex: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  grade?: string | null;
  startDate: string;
  endDate: string;
  highlights?: string | null;
  orderIndex: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  designation: string;
  company: string;
  avatarUrl?: string | null;
  content: string;
  rating: number;
  published: boolean;
  orderIndex: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  posts?: BlogPost[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  author: string;
  readingTime: string;
  tags: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  categoryId: string;
  category?: BlogCategory;
  createdAt: string;
  updatedAt: string;
  relatedPosts?: Array<{
    title: string;
    slug: string;
    coverImage: string;
    createdAt: string;
    readingTime: string;
  }>;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  projectType?: string | null;
  budget?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  iconName?: string | null;
  orderIndex: number;
}

export interface SiteSettings {
  id: string;
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  keywords: string;
  primaryColor: string;
  accentColor: string;
  customCss?: string | null;
  analyticsId?: string | null;
}
