import { render, screen } from '@testing-library/react';

import HomeWelcomeSection from '.';

describe('Given HomeWelcomeSection', () => {
  it('should display the section without issues', () => {
    render(<HomeWelcomeSection />);
    const sectionElement = screen.getByLabelText('home-welcome-section');

    expect(sectionElement).toBeInTheDocument();
  });
});
