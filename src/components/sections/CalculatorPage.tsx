import React, { useState } from 'react';
import { Lang, translations } from '../../locales/translations';
import CalculatorViewer from './CalculatorViewer';

interface CalculatorPageProps {
  lang: Lang;
}

const CalculatorPage: React.FC<CalculatorPageProps> = ({ lang }) => {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);
  const t = translations[lang].calculatorPage;

  if (selectedCalculator) {
    return <CalculatorViewer url={selectedCalculator} onClose={() => setSelectedCalculator(null)} backText={t.back} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">{t.title}</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t.autoDI}</h2>
            <div className="flex space-x-4">
              <a href="#" onClick={() => setSelectedCalculator(lang === 'lt' ? "/calculators/Auto_DI_skaiciuokle.html" : "/calculators/Auto_DI_calculator_en.html")} className="text-blue-500 hover:underline">{lang === 'lt' ? t.ltVersion : t.enVersion}</a>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t.roi}</h2>
            <div className="flex space-x-4">
              <a href="#" onClick={() => setSelectedCalculator(lang === 'lt' ? "/calculators/ROI_LT.html" : "/calculators/ROI_EN.html")} className="text-blue-500 hover:underline">{lang === 'lt' ? t.ltVersion : t.enVersion}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
