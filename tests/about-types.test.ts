import { readFile } from 'node:fs/promises';
import path from 'node:path';

import type { AboutContent } from '@/modules/about/types';

describe('about content contract', () => {
  it('allows optional fields to be omitted (type-level)', () => {
    const minimal = {
      name: 'Your Name',
      tagline: '一句话定位',
      bio: ['一句简介']
    } satisfies AboutContent;

    expect(minimal.name).toBe('Your Name');
  });

  it('can load and parse content/about/about.json', async () => {
    const filePath = path.join(process.cwd(), 'content', 'about', 'about.json');
    const raw = await readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw) as AboutContent;

    expect(typeof parsed.name).toBe('string');
    expect(typeof parsed.tagline).toBe('string');
    expect(Array.isArray(parsed.bio)).toBe(true);
  });
});

