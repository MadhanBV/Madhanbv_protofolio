import { BriefcaseBusiness, Camera, Code2, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';

const socialLinks = [
  { label: 'GitHub', href: PERSONAL_INFO.socials.github, icon: Code2 },
  { label: 'LinkedIn', href: PERSONAL_INFO.socials.linkedin, icon: BriefcaseBusiness },
  { label: 'Instagram', href: PERSONAL_INFO.socials.instagram, icon: Camera },
  { label: 'Email', href: `mailto:${PERSONAL_INFO.email}`, icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="section-container flex flex-col gap-4 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
        <p>© 2026 MADHAN BV. Crafted with clarity, motion, and care.</p>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={label === 'Email' ? undefined : '_blank'}
              rel={label === 'Email' ? undefined : 'noopener noreferrer'}
              className="rounded-md p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-cyan-200"
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
