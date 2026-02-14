import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '@/app/page';

describe('Home', () => {
  it('renders the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: /Welcome to Jooyong DevLog/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
