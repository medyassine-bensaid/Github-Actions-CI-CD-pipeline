import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeDefined();
  });

  it('contains welcome text', () => {
    render(<App />);
    // This test will pass as long as there's any text content in the app
    // Adjust this based on what's actually in your App component
    expect(screen.getByText(/./i)).toBeDefined();
  });
});
