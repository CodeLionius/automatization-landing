import React from 'react';

interface SectionProps {
  t: any; // Pakeisti į tikrą Translation tipą, kai bus perkeltas translations objektas
}

// Footer sekcija
const Footer: React.FC<SectionProps & { onShowPrivacy: () => void; setShowCalculator: (show: boolean) => void; }> = React.memo(({ t, onShowPrivacy, setShowCalculator }) => (
  <footer className="bg-gray-800 text-white py-10">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h4 className="text-xl font-bold mb-4 text-blue-300">{t.siteName}</h4>
        <p className="text-gray-400 text-sm">{t.companyDesc}</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 text-blue-300">{t.quickLinks}</h4>
        <ul className="space-y-2">
          <li><a href="#home" className="text-gray-400 hover:text-white transition duration-300">{t.nav.home}</a></li>
          <li><a href="#features" className="text-gray-400 hover:text-white transition duration-300">{t.nav.features}</a></li>
          <li><a href="#feedback" className="text-gray-400 hover:text-white transition duration-300">{t.contactUs}</a></li>
          <li><a href="#" onClick={e => { e.preventDefault(); onShowPrivacy(); }} className="text-gray-400 hover:text-white transition duration-300">{t.privacy}</a></li>
        </ul>
      </div>
      <div id="footer-contact">
        <h4 className="text-lg font-semibold mb-4 text-blue-300">{t.contact}</h4>
        <p className="text-gray-400">{t.address}</p>
        <p className="text-gray-400">{t.email}</p>
        <p className="text-gray-400">{t.phone}</p>
      </div>
    </div>
    <div className="text-center text-gray-500 text-sm mt-8">
      &copy; {new Date().getFullYear()} {t.siteName}. {t.copyright}
    </div>
  </footer>
));

export default Footer;
