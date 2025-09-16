import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AIServiceLandingPage from './App';

describe('AIServiceLandingPage', () => {
  it('renders main application elements', async () => {
    let container;
    await act(async () => {
      const result = render(<AIServiceLandingPage />);
      container = result.container;
    });
    
    // Wait for components to load
    await waitFor(() => {
      // Check if the app renders without crashing
      expect(container).toBeInTheDocument();
      
      // Check for basic elements that should always be present (using getAllByText for multiple occurrences)
      const aiAutomateElements = screen.getAllByText('AIAutomate');
      expect(aiAutomateElements.length).toBeGreaterThan(0);
      
      // Check for navigation elements
      expect(screen.getByText('EN')).toBeInTheDocument();
      expect(screen.getByText('LT')).toBeInTheDocument();
    });
  });

  it('renders navigation menu', async () => {
    await act(async () => {
      render(<AIServiceLandingPage />);
    });
    
    await waitFor(() => {
      // Check navigation links are present - use getAllByText for multiple elements
      const homeLinks = screen.getAllByText('Home');
      expect(homeLinks.length).toBeGreaterThan(0); // Should find at least one
      
      const featuresLinks = screen.getAllByText('Features');
      expect(featuresLinks.length).toBeGreaterThan(0); // Should find at least one
      
      // Tools is no longer in main navigation, check for Contact instead
      const contactUsLinks = screen.getAllByText('Contact Us');
      expect(contactUsLinks.length).toBeGreaterThan(0);
    });
  });
});
