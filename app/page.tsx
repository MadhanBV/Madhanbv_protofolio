import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import CurrentlyBuilding from '@/components/sections/CurrentlyBuilding';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Hackathons from '@/components/sections/Hackathons';
import Research from '@/components/sections/Research';
import TechStack from '@/components/sections/TechStack';
import Contact from '@/components/sections/Contact';
import Navbar from '@/components/common/Navbar';
import ScrollProgress from '@/components/common/ScrollProgress';
import CursorGlow from '@/components/ui/CursorGlow';
import Footer from '@/components/common/Footer';
import { PERSONAL_INFO } from '@/lib/constants';

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.title,
    email: PERSONAL_INFO.email,
    url: 'https://madhanbv.dev',
    sameAs: [
      PERSONAL_INFO.socials.github,
      PERSONAL_INFO.socials.linkedin,
      PERSONAL_INFO.socials.instagram,
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: PERSONAL_INFO.university,
    },
    knowsAbout: [
      'Full-stack development',
      'Blockchain',
      'UI/UX design',
      'Scalable web systems',
      'Product engineering',
    ],
  };

  return (
    <main className="relative overflow-hidden text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <ScrollProgress />
      <CursorGlow />

      <Hero />
      <About />
      <CurrentlyBuilding />
      <Projects />
      <Experience />
      <Hackathons />
      <Research />
      <TechStack />
      <Contact />
      <Footer />
    </main>
  );
}
