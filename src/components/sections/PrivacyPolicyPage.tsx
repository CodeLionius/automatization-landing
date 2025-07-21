import React from 'react';
import { translations, Lang } from '../../locales/translations';

interface PrivacyPolicyPageProps {
  setShowPrivacy: (v: boolean) => void;
  lang: Lang; // Add lang prop
}

// Privatumo politikos komponentas
const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ setShowPrivacy, lang }) => {
  const t = translations[lang].privacyPolicy; // Access localized privacy policy text
  const currentLocale = lang === 'lt' ? 'lt-LT' : 'en-US'; // Determine locale for date formatting

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 bg-white rounded-xl shadow-lg mt-10 mb-10">
      <button type="button" onClick={() => setShowPrivacy(false)} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        {t.back}
      </button>
      <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
      <p className="mb-4">{t.intro}</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">{t.section1Title}</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>{t.section1List1}</li>
        <li>{t.section1List2}</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">{t.section2Title}</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>{t.section2List1}</li>
        <li>{t.section2List2}</li>
        <li>{t.section2List3}</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">{t.section3Title}</h2>
      <p className="mb-4">{t.section3Text}</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">{t.section4Title}</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>{t.section4List1}</li>
        <li>{t.section4List2}</li>
        <li>{t.section4List3}</li>
        <li>{t.section4List4}</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">{t.section5Title}</h2>
      <p className="mb-4">{t.section5Text}</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">{t.section6Title}</h2>
      <p>{t.section6Text} <a href={`mailto:${t.emailAddress}`} className="text-blue-600 underline">{t.emailAddress}</a></p>
      <p className="mt-8 text-gray-500 text-sm">{t.lastUpdated}: {new Date().toLocaleDateString(currentLocale)}</p>
    </div>
  );
};

export default PrivacyPolicyPage;