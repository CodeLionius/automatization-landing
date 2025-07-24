import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clsx from 'clsx';

import { translations, Lang, Translation } from './locales/translations';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import CTASection from './components/sections/CTASection';
import Footer from './components/sections/Footer';
import PrivacyPolicyPage from './components/sections/PrivacyPolicyPage';
import CalculatorPage from './components/sections/CalculatorPage';

const navLinks = [
  { id: "#home", label: "home" },
  { id: "#features", label: "features" },
  { id: "#feedback", label: "contactUsHeader" },
  { id: "#footer-contact", label: "contact" },
];

const MainContent = ({ t, feedbackKey }: { t: Translation, feedbackKey: number }) => (
  <>
    <HeroSection t={t} />
    <FeaturesSection t={t} />
    <CTASection t={t} />
    <section id="feedback" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">{t.feedbackTitle}</h2>
        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500">
          <iframe
            key={feedbackKey} // Priverčia React perkurti iframe
            data-tally-src="https://tally.so/embed/mBJkv5?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="361"
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            title="Contact form"
          ></iframe>
        </div>
      </div>
    </section>
  </>
);

// Pagrindinis komponentas
const AIServiceLandingPage = () => {
  const [activeSection, setActiveSection] = useState(window.location.hash || "#home");
  const [lang, setLang] = useState<Lang>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for mobile menu
  const [showPrivacy, setShowPrivacy] = useState(false); // PRIVACY STATE
  const [showCalculator, setShowCalculator] = useState(false); // CALCULATOR STATE
  const [feedbackKey, setFeedbackKey] = useState(0); // Pridėta: key iframe'ui
  const t = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    const onHashChange = () => setActiveSection(window.location.hash || "#home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const scriptId = "tally-embed-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://tally.so/widgets/embed.js";
      script.onload = script.onerror = () => {
        if (window.Tally && typeof window.Tally.loadEmbeds === 'function') {
          window.Tally.loadEmbeds();
        } else {
          document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e) => {
            const iframe = e as HTMLIFrameElement;
            iframe.src = iframe.dataset.tallySrc!;
          });
        }
      };
      document.body.appendChild(script);
    } else {
      if (window.Tally && typeof window.Tally.loadEmbeds === 'function') {
        window.Tally.loadEmbeds();
      }
    }
  }, []);

  // New useEffect to re-initialize Tally form when returning to main content
  useEffect(() => {
    if (!showPrivacy && !showCalculator) {
      // Ensure Tally is loaded and then re-initialize embeds
      if (window.Tally && typeof window.Tally.loadEmbeds === 'function') {
        const timer = setTimeout(() => {
          if (window.Tally && typeof window.Tally.loadEmbeds === 'function') {
            window.Tally.loadEmbeds();
          }
        }, 100); // Small delay to ensure iframe is rendered
        return () => clearTimeout(timer);
      }
    }
  }, [showPrivacy, showCalculator, feedbackKey]);

  const handleLangChange = useCallback((lng: Lang) => setLang(lng), []);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Pridėta: funkcija atnaujinti feedbackKey
  const refreshFeedback = () => setFeedbackKey(Date.now());

  const handleNavLinkClick = useCallback((sectionId: string, closeMenu: boolean = false) => {
    setShowCalculator(false);
    setShowPrivacy(false); // Ensure privacy policy is hidden
    refreshFeedback();
    setActiveSection(sectionId);
    if (closeMenu) {
      toggleMenu();
    }
  }, [refreshFeedback, toggleMenu, setActiveSection]);

  const handleCalculatorClick = useCallback(() => {
    setShowCalculator(true);
    setShowPrivacy(false); // Ensure privacy policy is hidden
    refreshFeedback();
    setIsMenuOpen(false); // Close menu on mobile
  }, [refreshFeedback]);

  if (showPrivacy) {
    return <PrivacyPolicyPage setShowPrivacy={setShowPrivacy} lang={lang} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600"><a href="#" onClick={() => handleNavLinkClick("#home")}>{t.siteName}</a></div>
          <nav className="hidden md:flex space-x-6">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={link.id}
                onClick={() => handleNavLinkClick(link.id)}
                className={clsx(
                  "text-gray-600 hover:text-blue-600 transition duration-300",
                  { "text-blue-700 font-bold underline": activeSection === link.id }
                )}
              >
                {t.nav[link.label as keyof typeof t.nav]}
              </a>
            ))}
            <a href="#" onClick={handleCalculatorClick} className="text-gray-600 hover:text-blue-600 transition duration-300">{t.nav.calculator}</a>
          </nav>
          <div className="flex items-center space-x-2 ml-4">
            <button className={clsx("px-2 py-1 rounded", { 'bg-blue-600 text-white font-bold': lang === 'en', 'bg-gray-200 text-gray-700': lang !== 'en' })} onClick={() => handleLangChange('en')} aria-label="Switch to English">EN</button>
            <button className={clsx("px-2 py-1 rounded", { 'bg-blue-600 text-white font-bold': lang === 'lt', 'bg-gray-200 text-gray-700': lang !== 'lt' })} onClick={() => handleLangChange('lt')} aria-label="Perjungti į lietuvių kalbą">LT</button>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navLinks.map(link => (
                <a
                  key={link.id}
                  href={link.id}
                  onClick={() => handleNavLinkClick(link.id, true)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  {t.nav[link.label as keyof typeof t.nav]}
                </a>
              ))}
              <a href="#" onClick={handleCalculatorClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{t.nav.calculator}</a>
            </nav>
          </div>
        )}
      </header>
      {showCalculator ? <CalculatorPage lang={lang} /> : <MainContent t={t} feedbackKey={feedbackKey} />}
      <Footer t={t} onShowPrivacy={() => setShowPrivacy(true)} setShowCalculator={setShowCalculator} />
    </div>
  );
};

export default AIServiceLandingPage;