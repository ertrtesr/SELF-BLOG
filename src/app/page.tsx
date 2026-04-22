export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">极简个人站</h1>
      <p className="text-sm leading-6 text-zinc-700">
        这里将承载「关于我 / 作品集 / 博客」三大板块，并支持本地编辑与一键发布到 Vercel。
      </p>
      <div className="flex gap-3 text-sm">
        <a className="text-zinc-900 underline underline-offset-4" href="/about">
          去 About
        </a>
        <a className="text-zinc-900 underline underline-offset-4" href="/projects">
          去 Projects
        </a>
        <a className="text-zinc-900 underline underline-offset-4" href="/blog">
          去 Blog
        </a>
      </div>
    </div>
  );
}

