import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'SELF-BLOG',
    template: '%s | SELF-BLOG'
  },
  description: 'A minimal personal site: About, Projects, Blog.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10">
          <header className="mb-10 flex items-baseline justify-between">
            <a className="text-sm font-semibold tracking-tight" href="/">
              SELF-BLOG
            </a>
            <nav className="flex gap-4 text-sm text-zinc-700">
              <a className="hover:text-zinc-950" href="/about">
                About
              </a>
              <a className="hover:text-zinc-950" href="/projects">
                Projects
              </a>
              <a className="hover:text-zinc-950" href="/blog">
                Blog
              </a>
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="mt-12 text-xs text-zinc-500">
            <p>© {new Date().getFullYear()} SELF-BLOG</p>
          </footer>
        </div>
      </body>
    </html>
  );
}

