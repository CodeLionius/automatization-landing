import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AIServiceLandingPage from './App';

describe('AIServiceLandingPage', () => {
  it('renders main sections', () => {
    render(<AIServiceLandingPage />);
    expect(screen.getByText(/Revolutionize Your Business/i)).toBeInTheDocument();
    expect(screen.getByText(/Send Us Your Feedback/i)).toBeInTheDocument();
  });
}); 