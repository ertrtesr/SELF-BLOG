export type AboutAvatar =
  | {
      src: string;
      alt?: string;
    }
  | undefined;

export type AboutContactKind = 'email' | 'github' | 'x' | 'website';

export type AboutContactItem = {
  kind: AboutContactKind;
  value: string;
  label?: string;
};

export type AboutContent = {
  name: string;
  tagline: string;
  bio: string[];
  avatar?: AboutAvatar;
  now?: string;
  skills?: string[];
  contact?: AboutContactItem[];
  ctaBlog?: {
    label?: string;
    href: string;
  };
};

