import React from 'react';
import HeroSection from '../components/HeroSection/heroSection';
import FeatureSection from '../components/Features/featureSection';
import CTASection from '../components/ctaSection/ctaSection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeatureSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
