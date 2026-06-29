/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortfolioItem {
  id: string;
  title: string;
  category: "Websites" | "Branding" | "Photography" | "Video" | "Marketing" | "AI";
  subHeadline: string;
  description: string;
  challenge: string;
  strategy: string;
  results: string;
  metrics: { [key: string]: string };
  imageUrl: string;
}

export interface BlogItem {
  id: string;
  title: string;
  category: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  imageUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface CareerItem {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  budget: string;
  projectType: string;
  timeline: string;
  message: string;
  status: "new" | "reviewed" | "archived";
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface ConsultationBooking {
  id: string;
  name: string;
  email: string;
  company: string;
  date: string;
  timeSlot: string;
  brief: string;
  createdAt: string;
}

export interface ClientPortalProject {
  id: string;
  name: string;
  status: string;
  progress: number;
  milestones: { name: string; completed: boolean; date: string }[];
  invoices: { id: string; amount: string; status: "Paid" | "Pending"; date: string }[];
  messages: { sender: string; text: string; date: string }[];
  files: { name: string; size: string; date: string }[];
}
