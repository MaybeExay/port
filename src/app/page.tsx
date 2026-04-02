'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactsSection } from '@/components/sections/ContactsSection';
import { AnimatedCursor } from '@/components/animations/AnimatedCursor';
import PipeAnimation from '@/components/animations/PipeAnimation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Animated Cursor - только на клиенте и не на мобильных */}
      {isMounted && <AnimatedCursor />}

      {/* Pipe Animation Background - Windows-style */}
      <PipeAnimation />

      <Header />

      <main className="flex-1">
        <HeroSection
          onProjectsClick={() => scrollToSection('#projects')}
          onContactClick={() => scrollToSection('#contacts')}
        />
        <AboutSection />
        <ProjectsSection />
        <ContactsSection />
      </main>

      <Footer />
    </>
  );
}
