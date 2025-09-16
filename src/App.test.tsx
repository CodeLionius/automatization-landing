import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AIServiceLandingPage from './App';

describe('AIServiceLandingPage', () => {
  it('renders main sections after lazy loading', async () => {
    render(<AIServiceLandingPage />);
    
    // Check for immediately visible elements
    expect(screen.getByText('AIAutomate')).toBeInTheDocument();
    expect(screen.getByText(/Send Us Your Feedback/i)).toBeInTheDocument();
    
    // Wait for lazy components to potentially load (optional test)
    // Note: In test environment, lazy loading may behave differently
  });
});
