import React, { useMemo } from 'react';
import { ICONS } from '../../constants/icons';

interface Feature {
  title: string;
  desc: string;
  icon: string;
}

interface SectionProps {
  t: any; // Pakeisti į tikrą Translation tipą, kai bus perkeltas translations objektas
}

// Features sekcija
const FeaturesSection: React.FC<SectionProps> = React.memo(({ t }) => {
  const features = useMemo(() => t.features, [t]);
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">{t.featuresTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature: Feature, i: number) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500">
              <div className="text-blue-600 mb-4">
                {ICONS[feature.icon]}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeaturesSection;
