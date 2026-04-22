import { readFile } from 'node:fs/promises';
import path from 'node:path';

import type { AboutContent, AboutContactItem } from './types';

export type AboutAvatarNormalized =
  | {
      kind: 'image';
      src: string;
      alt?: string;
    }
  | {
      kind: 'placeholder';
    };

export type AboutNormalized = {
  name: string;
  tagline: string;
  bio: string[];
  avatar: AboutAvatarNormalized;
  now: string | null;
  skills: string[];
  contact: AboutContactItem[];
  contactFallbackMessage: string | null;
  ctaBlog: {
    label: string;
    href: string;
  };
};

const DEFAULT_CONTACT_FALLBACK_MESSAGE = '暂无公开联系方式。';
const DEFAULT_CTA_BLOG = { label: '去博客看看', href: '/blog' } as const;

export function normalizeAbout(content: AboutContent): AboutNormalized {
  const now = content.now?.trim();

  const contact = content.contact ?? [];
  const contactFallbackMessage =
    contact.length === 0 ? DEFAULT_CONTACT_FALLBACK_MESSAGE : null;

  const skills = content.skills ?? [];

  const avatar =
    content.avatar?.src && content.avatar.src.trim().length > 0
      ? { kind: 'image' as const, src: content.avatar.src, alt: content.avatar.alt }
      : { kind: 'placeholder' as const };

  const ctaBlog = content.ctaBlog?.href
    ? { label: content.ctaBlog.label ?? DEFAULT_CTA_BLOG.label, href: content.ctaBlog.href }
    : DEFAULT_CTA_BLOG;

  return {
    name: content.name,
    tagline: content.tagline,
    bio: content.bio,
    avatar,
    now: now && now.length > 0 ? now : null,
    skills,
    contact,
    contactFallbackMessage,
    ctaBlog
  };
}

export async function getAbout(): Promise<AboutNormalized> {
  const filePath = path.join(process.cwd(), 'content', 'about', 'about.json');
  const raw = await readFile(filePath, 'utf8');
  const parsed = JSON.parse(raw) as AboutContent;
  return normalizeAbout(parsed);
}

