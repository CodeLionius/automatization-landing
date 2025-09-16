import React, { useMemo } from 'react';
import { ICONS } from '../../constants/icons';
import { Translation } from '../../locales/translations';
import { useLazyLoad } from '../../hooks/usePerformance';

interface Feature {
  title: string;
  desc: string;
  icon: string;
}

interface SectionProps {
  t: Translation;
}

// Features sekcija with performance optimizations
const FeaturesSection: React.FC<SectionProps> = React.memo(({ t }) => {
  const features = useMemo(() => t.features, [t]);
  const { elementRef, shouldLoad } = useLazyLoad(0.2);
  
  return (
    <section id="features" className="py-20 bg-gray-50" ref={elementRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">{t.featuresTitle}</h2>
        {shouldLoad ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature: Feature, i: number) => (
              <div 
                key={i} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500"
                style={{ 
                  animationDelay: `${i * 100}ms`,
                  animation: 'fadeIn 0.6s ease-out forwards'
                }}
              >
                <div className="text-blue-600 mb-4">
                  {ICONS[feature.icon]}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 p-8 rounded-xl animate-pulse">
                <div className="h-8 w-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.t.features) === JSON.stringify(nextProps.t.features) &&
         prevProps.t.featuresTitle === nextProps.t.featuresTitle;
});

export default FeaturesSection;
