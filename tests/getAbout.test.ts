import { normalizeAbout } from '@/modules/about/getAbout';

describe('normalizeAbout', () => {
  it('returns now=null when now is missing', () => {
    const normalized = normalizeAbout({
      name: 'n',
      tagline: 't',
      bio: ['b']
    });

    expect(normalized.now).toBeNull();
  });

  it('returns now=null when now is empty/whitespace', () => {
    const normalized = normalizeAbout({
      name: 'n',
      tagline: 't',
      bio: ['b'],
      now: '   '
    });

    expect(normalized.now).toBeNull();
  });

  it('marks avatar as placeholder when missing', () => {
    const normalized = normalizeAbout({
      name: 'n',
      tagline: 't',
      bio: ['b']
    });

    expect(normalized.avatar.kind).toBe('placeholder');
  });

  it('provides contactFallbackMessage when contact is missing', () => {
    const normalized = normalizeAbout({
      name: 'n',
      tagline: 't',
      bio: ['b']
    });

    expect(normalized.contact).toEqual([]);
    expect(normalized.contactFallbackMessage).toMatch(/暂无|联系/);
  });

  it('does not set contactFallbackMessage when contact exists', () => {
    const normalized = normalizeAbout({
      name: 'n',
      tagline: 't',
      bio: ['b'],
      contact: [{ kind: 'email', value: 'a@b.com' }]
    });

    expect(normalized.contact.length).toBe(1);
    expect(normalized.contactFallbackMessage).toBeNull();
  });
});

