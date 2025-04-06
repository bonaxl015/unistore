import { render, screen } from '@testing-library/react';

import HomeFeatureSection from '.';

describe('Given HomeFeatureSection', () => {
  it('should display the section without issues', () => {
    render(<HomeFeatureSection />);
    const sectionElement = screen.getByLabelText('home-feature-section');

    expect(sectionElement).toBeInTheDocument();
  });
});
