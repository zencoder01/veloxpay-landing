'use client';

import { useState } from 'react';
import Hero from './components/hero';
import TrustStrip from './components/trust-strip';
import Features from './components/features';
import HowItWorks from './components/how-it-works';
import Developer from './components/developer';
import UseCases from './components/use-cases';
import Pricing from './components/pricing';
import WaitlistCTA from './components/waitlist-cta';
import WaitlistForm from './components/waitlist-form';
import Footer from './components/footer';

export default function Home() {
  const [showWaitlist, setShowWaitlist] = useState(false);

  const handleWaitlistOpen = () => {
    setShowWaitlist(true);
  };

  const handleWaitlistClose = () => {
    setShowWaitlist(false);
  };

  return (
    <main className="w-full bg-[#0f1629]">
      <Hero onWaitlistClick={handleWaitlistOpen} />
      <TrustStrip />
      <Features />
      <HowItWorks />
      <Developer />
      <UseCases />
      <Pricing onRequestAccess={handleWaitlistOpen} />
      <WaitlistCTA onWaitlistClick={handleWaitlistOpen} />
      <Footer />
      <WaitlistForm isOpen={showWaitlist} onClose={handleWaitlistClose} />
    </main>
  );
}
