import React, { useMemo } from 'react';
import { Translation } from '../../locales/translations';

interface SectionProps {
  t: Translation;
}

// Hero sekcija - Optimized with proper memoization
const HeroSection: React.FC<SectionProps> = React.memo(({ t }) => {
  const heroTitle = useMemo(() => t.heroTitle, [t.heroTitle]);
  const heroHighlight = useMemo(() => t.heroHighlight, [t.heroHighlight]);
  const heroDesc = useMemo(() => t.heroDesc, [t.heroDesc]);

  return (
    <section id="home" className="relative py-20 lg:py-32 text-center bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-xl">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          {heroTitle}<span className="text-cyan-300">{heroHighlight}</span>
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-10">{heroDesc}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          
        </div>
      </div>
    </section>
  );
}, (prevProps, nextProps) => {
  return prevProps.t.heroTitle === nextProps.t.heroTitle &&
         prevProps.t.heroHighlight === nextProps.t.heroHighlight &&
         prevProps.t.heroDesc === nextProps.t.heroDesc;
});

export default HeroSection;
