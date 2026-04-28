'use client';

import { useState } from 'react';
import Hero from './components/hero';
import ProblemStatement from './components/problem-statement';
import HowItWorks from './components/how-it-works';
import PaymentMethods from './components/payment-methods';
import TrustNumbers from './components/trust-numbers';
import DeveloperSection from './components/developer-section';
import FAQ from './components/faq';
import FinalCTA from './components/final-cta';
import Footer from './components/footer';
import WaitlistForm from './components/waitlist-form';

export default function Home() {
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <main className="w-full">
      <Hero onWaitlistClick={() => setShowWaitlist(true)} />
      <ProblemStatement />
      <HowItWorks />
      <PaymentMethods />
      <TrustNumbers />
      <DeveloperSection />
      <FAQ />
      <FinalCTA onWaitlistClick={() => setShowWaitlist(true)} />
      <Footer />
      <WaitlistForm isOpen={showWaitlist} onClose={() => setShowWaitlist(false)} />
    </main>
  );
}
