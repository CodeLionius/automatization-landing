import React from 'react';

interface SectionProps {
  t: any; // Pakeisti į tikrą Translation tipą, kai bus perkeltas translations objektas
}

// CTA sekcija
const CTASection: React.FC<SectionProps> = React.memo(({ t }) => (
  <section className="py-20 bg-gradient-to-br from-blue-700 to-purple-800 text-white text-center shadow-inner">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t.ctaTitle}</h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto">{t.ctaDesc}</p>
      <a
        href="https://cal.com/lionius/30min?overlayCalendar=true"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95 inline-block"
      >
        {t.ctaBtn}
      </a>
    </div>
  </section>
));

export default CTASection;
