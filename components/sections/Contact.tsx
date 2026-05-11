'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  Camera,
  Code2,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
} from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import GlassPanel from '@/components/ui/GlassPanel';
import RevealText from '@/components/ui/RevealText';
import Toast from '@/components/ui/Toast';
import { PERSONAL_INFO } from '@/lib/constants';
import { cn } from '@/lib/utils';

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: '',
  email: '',
  message: '',
};

const socialLinks = [
  {
    icon: Mail,
    label: 'Email',
    href: `mailto:${PERSONAL_INFO.email}`,
    value: PERSONAL_INFO.email,
    tone: 'text-red-300',
  },
  {
    icon: BriefcaseBusiness,
    label: 'LinkedIn',
    href: PERSONAL_INFO.socials.linkedin,
    value: '@madhanbv',
    tone: 'text-blue-300',
  },
  {
    icon: Code2,
    label: 'GitHub',
    href: PERSONAL_INFO.socials.github,
    value: '@MadhanBV',
    tone: 'text-gray-200',
  },
  {
    icon: Camera,
    label: 'Instagram',
    href: PERSONAL_INFO.socials.instagram,
    value: '@madhan_b_v',
    tone: 'text-pink-300',
  },
];

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (form.name.trim().length < 2) {
    errors.name = 'Use at least 2 characters.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (form.message.trim().length < 16) {
    errors.message = 'Write a short note with at least 16 characters.';
  }

  return errors;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toastVisible, setToastVisible] = useState(false);

  const messagePreview = useMemo(() => {
    const name = formData.name.trim() || 'Your name';
    const message =
      formData.message.trim() ||
      'A focused note about a collaboration, opportunity, or product idea.';

    return { name, message };
  }, [formData.message, formData.name]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setToastVisible(true);
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );

    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setToastVisible(true);
  };

  return (
    <section id="contact" className="relative py-20 md:py-32">
      <a
        href={`mailto:${PERSONAL_INFO.email}`}
        className="fixed bottom-5 left-5 z-40 hidden rounded-lg border border-cyan-300/25 bg-black/60 px-3 py-2 text-sm text-cyan-100 shadow-2xl backdrop-blur-xl transition-colors hover:bg-black/80 lg:inline-flex"
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Contact
      </a>

      <div className="section-container">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold text-cyan-300">Contact</p>
          <h2 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-bold text-white md:text-5xl">
            <RevealText text="Let's Build Something Meaningful" />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-400">
            Open to collaborations, internship conversations, startup experiments,
            and thoughtful product ideas.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="space-y-4">
            {socialLinks.map(({ icon: Icon, label, href, value, tone }) => (
              <motion.a
                key={label}
                href={href}
                target={label === 'Email' ? undefined : '_blank'}
                rel={label === 'Email' ? undefined : 'noopener noreferrer'}
                whileHover={{ x: 5 }}
                className="group flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl transition-colors hover:border-cyan-300/30 hover:bg-white/[0.08]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-black/25">
                  <Icon className={cn('h-5 w-5', tone)} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-gray-400">{label}</span>
                  <span className="block truncate font-medium text-white group-hover:text-cyan-100">
                    {value}
                  </span>
                </span>
              </motion.a>
            ))}

            <GlassPanel glow="emerald" className="p-5">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
                <div>
                  <p className="font-display text-lg font-semibold text-white">
                    Response style
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Clear context, product intent, and a concrete next step make
                    collaboration easier to start.
                  </p>
                </div>
              </div>
            </GlassPanel>
          </div>

          <GlassPanel glow="purple" className="p-5 md:p-6">
            <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-[1fr_0.82fr]">
              <div className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm text-gray-300">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={cn(
                      'w-full rounded-lg border bg-black/35 px-4 py-3 text-white placeholder:text-gray-600 transition-all focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/15',
                      errors.name ? 'border-red-300/45' : 'border-white/10'
                    )}
                    placeholder="Your name"
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        id="contact-name-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-2 text-xs text-red-300"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm text-gray-300">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={cn(
                      'w-full rounded-lg border bg-black/35 px-4 py-3 text-white placeholder:text-gray-600 transition-all focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/15',
                      errors.email ? 'border-red-300/45' : 'border-white/10'
                    )}
                    placeholder="you@example.com"
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        id="contact-email-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-2 text-xs text-red-300"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    rows={6}
                    className={cn(
                      'w-full resize-none rounded-lg border bg-black/35 px-4 py-3 text-white placeholder:text-gray-600 transition-all focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/15',
                      errors.message ? 'border-red-300/45' : 'border-white/10'
                    )}
                    placeholder="Tell me about the project, opportunity, or idea."
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        id="contact-message-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-2 text-xs text-red-300"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatedButton
                  variant="primary"
                  size="lg"
                  icon={<Send className="h-5 w-5" />}
                  className="w-full"
                >
                  Send Message
                </AnimatedButton>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-200">
                  <MessageSquare className="h-4 w-4" />
                  Message Preview
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
                  <p className="text-sm font-semibold text-white">
                    {messagePreview.name}
                  </p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-400">
                    {messagePreview.message}
                  </p>
                </div>
              </div>
            </form>
          </GlassPanel>
        </div>
      </div>

      <Toast
        visible={toastVisible}
        type={Object.keys(errors).length > 0 ? 'error' : 'success'}
        message={
          Object.keys(errors).length > 0
            ? 'Please fix the highlighted fields.'
            : 'Opening your email client with the message.'
        }
        onClose={() => setToastVisible(false)}
      />
    </section>
  );
};

export default Contact;
