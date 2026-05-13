import Image from 'next/image';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import GlassPanel from '@/components/ui/GlassPanel';

const resumeImage = '/images/resume/myresume.jpeg';
const resumePdf =
  'https://drive.google.com/file/d/10faBkfjhxakCEK_TfSMK37dgzmLFKGmW/view?usp=drive_link';

export default function ResumePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_55%),radial-gradient(circle_at_18%_30%,rgba(16,185,129,0.14),transparent_48%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-28 top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-purple-400/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-20 pt-24 sm:pt-28">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
              Resume
            </p>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              MY RESUME
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
              Click the preview to open the full image. Use the button to
              download the PDF version.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AnimatedButton
              href="/"
              variant="outline"
              size="md"
              icon={<ArrowLeft className="h-4 w-4" />}
            >
              Back Home
            </AnimatedButton>
            <AnimatedButton
              href={resumePdf}
              variant="primary"
              size="md"
              icon={<Download className="h-4 w-4" />}
            >
              Download PDF
            </AnimatedButton>
          </div>
        </header>

        <GlassPanel glow="cyan" className="p-4 sm:p-6">
          <a
            href={resumeImage}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-xl border border-white/10 bg-slate-950"
          >
            <Image
              src={resumeImage}
              alt="Resume preview"
              width={1400}
              height={1980}
              priority
              sizes="(max-width: 768px) 92vw, 760px"
              className="h-auto w-full"
            />
          </a>
        </GlassPanel>

        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4 text-cyan-200" />
            <span>Click the preview to open the full image in a new tab.</span>
          </div>
          <a
            href={resumeImage}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cyan-200 transition-colors hover:text-cyan-100"
          >
            Open image
          </a>
        </div>
      </div>
    </main>
  );
}
