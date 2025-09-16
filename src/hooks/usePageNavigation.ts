import { useState, useCallback } from 'react';

export const usePageNavigation = (initialSection = '#home') => {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const handleNavigation = useCallback((sectionId: string) => {
    setShowPrivacy(false);
    setShowCalculator(false);
    setActiveSection(sectionId);
    window.location.hash = sectionId;
  }, []);

  const handleShowPrivacy = useCallback(() => {
    setShowPrivacy(true);
    setShowCalculator(false);
  }, []);

  const handleShowCalculator = useCallback(() => {
    setShowCalculator(true);
    setShowPrivacy(false);
  }, []);

  return {
    activeSection,
    showPrivacy,
    showCalculator,
    handleNavigation,
    handleShowPrivacy,
    handleShowCalculator,
    setShowPrivacy,
    setShowCalculator,
    setActiveSection,
  };
};