import { render, screen } from '@testing-library/react';

import type { AboutNormalized } from '@/modules/about/getAbout';
import { AboutPageContent } from '@/app/about/page';

function makeAbout(overrides?: Partial<AboutNormalized>): AboutNormalized {
  return {
    name: 'Your Name',
    tagline: 'tagline',
    bio: ['bio line 1'],
    avatar: { kind: 'placeholder' },
    now: 'now text',
    skills: ['TypeScript'],
    contact: [],
    contactFallbackMessage: '暂无公开联系方式。',
    ctaBlog: { label: '去博客看看', href: '/blog' },
    ...overrides
  };
}

function expectBefore(a: HTMLElement, b: HTMLElement) {
  const pos = a.compareDocumentPosition(b);
  expect(Boolean(pos & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
}

describe('AboutPageContent', () => {
  it('renders h1 and key intro text', () => {
    render(<AboutPageContent about={makeAbout()} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Your Name')).toBeInTheDocument();
    expect(screen.getByText('tagline')).toBeInTheDocument();
    expect(screen.getByText('bio line 1')).toBeInTheDocument();
  });

  it('renders sections in the required order', () => {
    render(<AboutPageContent about={makeAbout()} />);

    const intro = screen.getByTestId('section-intro');
    const bio = screen.getByTestId('section-bio');
    const now = screen.getByTestId('section-now');
    const skills = screen.getByTestId('section-skills');
    const contact = screen.getByTestId('section-contact');
    const cta = screen.getByTestId('section-cta-blog');

    expectBefore(intro, bio);
    expectBefore(bio, now);
    expectBefore(now, skills);
    expectBefore(skills, contact);
    expectBefore(contact, cta);
  });

  it('does not render Now section when now is null', () => {
    render(<AboutPageContent about={makeAbout({ now: null })} />);
    expect(screen.queryByTestId('section-now')).toBeNull();
  });
});

