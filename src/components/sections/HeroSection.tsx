import React from 'react';

interface SectionProps {
  t: any; // Pakeisti į tikrą Translation tipą, kai bus perkeltas translations objektas
}

// Hero sekcija
const HeroSection: React.FC<SectionProps> = React.memo(({ t }) => (
  <section id="home" className="relative py-20 lg:py-32 text-center bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-xl">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
        {t.heroTitle}<span className="text-cyan-300">{t.heroHighlight}</span>
      </h1>
      <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-10">{t.heroDesc}</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        
      </div>
    </div>
  </section>
));

export default HeroSection;
