/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  since: string;
  avatarIcon: string;
  bio: string;
  stats: { val: string; lbl: string }[];
  linkedinUrl?: string;
  twitterUrl?: string;
  email?: string;
}

export interface RatingEntity {
  id: string;
  rank: number;
  name: string;
  subtitle: string;
  sector: string; // e.g., 'Finance', 'Health', 'Education', 'Judiciary', 'Governance'
  score: number; // out of 100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  trend: { type: 'up' | 'down' | 'flat'; value: number };
  reviewedDate: string;
  details: string;
}

export interface PodcastEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  category: string;
  duration: string;
  date: string;
  isPlaying?: boolean;
}

export interface RadioSchedule {
  day: string;
  time: string;
  show: string;
  desc: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  icon?: string;
}

export interface Branch {
  id: string;
  region: string;
  cities: string;
  status: 'Active' | 'Newly Established';
  programs: string;
  icon: string;
}

export interface Program {
  id: string;
  name: string;
  committee: string;
  themeColor: 'green' | 'blue' | 'orange' | 'dark';
  icon: string;
  description: string;
  metrics: { val: string; lbl: string }[];
  tags: string[];
}

export interface Cause {
  id: string;
  name: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  icon: string;
  thumbClass: string;
}

export interface DonationLog {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  causeName: string;
  amountGhs: number;
  refCode: string;
  timestamp: string;
}

export interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
}
