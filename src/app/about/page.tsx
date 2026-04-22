export const dynamic = 'force-static';

import type { Metadata } from 'next';

import type { AboutNormalized } from '@/modules/about/getAbout';
import { getAbout } from '@/modules/about/getAbout';

export const metadata: Metadata = {
  title: 'About',
  description: '关于我：简短介绍、我正在做什么、技能与联系方式。'
};

export function AboutPageContent({ about }: { about: AboutNormalized }) {
  return (
    <article className="prose prose-zinc max-w-none">
      <h1>About</h1>

      <section data-testid="section-intro" className="not-prose mt-6 flex items-center gap-4">
        <div
          data-testid="avatar"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-sm text-zinc-700"
          aria-label="Avatar"
        >
          {about.avatar.kind === 'image' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={about.avatar.alt ?? `${about.name} avatar`}
              className="h-12 w-12 rounded-full object-cover"
              src={about.avatar.src}
            />
          ) : (
            <span aria-hidden>{about.name.slice(0, 1).toUpperCase()}</span>
          )}
        </div>

        <div className="min-w-0">
          <div className="text-base font-semibold text-zinc-950">{about.name}</div>
          <div className="text-sm text-zinc-700">{about.tagline}</div>
        </div>
      </section>

      <section data-testid="section-bio" className="mt-8">
        {about.bio.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </section>

      {about.now ? (
        <section data-testid="section-now" className="mt-10">
          <h2>Now</h2>
          <p>{about.now}</p>
        </section>
      ) : null}

      <section data-testid="section-skills" className="mt-10">
        <h2>Skills</h2>
        {about.skills.length > 0 ? (
          <ul>
            {about.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        ) : (
          <p>—</p>
        )}
      </section>

      <section data-testid="section-contact" className="mt-10">
        <h2>Contact</h2>
        {about.contact.length > 0 ? (
          <ul>
            {about.contact.map((c) => (
              <li key={`${c.kind}:${c.value}`}>
                <span className="font-medium">{c.label ?? c.kind}</span>
                {' — '}
                <span className="break-all">{c.value}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>{about.contactFallbackMessage ?? '暂无公开联系方式。'}</p>
        )}
      </section>

      <section data-testid="section-cta-blog" className="mt-10">
        <h2>Next</h2>
        <p>
          <a href={about.ctaBlog.href}>{about.ctaBlog.label}</a>
        </p>
      </section>
    </article>
  );
}

export default async function AboutPage() {
  const about = await getAbout();
  return (
    <AboutPageContent about={about} />
  );
}

