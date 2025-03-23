import { render, screen } from '@testing-library/react';

import CarouselItem from './CarouselItem';
import useCarousel from '../hooks/useCarousel';

jest.mock('../hooks/useCarousel', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('Given CarouselItem component', () => {
  it('renders without crashing', () => {
    (useCarousel as jest.Mock).mockReturnValue({ orientation: 'horizontal' });

    const { container } = render(<CarouselItem />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies horizontal orientation class', () => {
    (useCarousel as jest.Mock).mockReturnValue({ orientation: 'horizontal' });

    render(<CarouselItem />);
    const item = screen.getByRole('group');

    expect(item).toHaveClass('pl-4');
    expect(item).not.toHaveClass('pt-4');
  });

  it('applies vertical orientation class', () => {
    (useCarousel as jest.Mock).mockReturnValue({ orientation: 'vertical' });

    render(<CarouselItem />);
    const item = screen.getByRole('group');

    expect(item).toHaveClass('pt-4');
    expect(item).not.toHaveClass('pl-4');
  });

  it('applies additional class names', () => {
    (useCarousel as jest.Mock).mockReturnValue({ orientation: 'horizontal' });

    render(<CarouselItem className="custom-class" />);
    const item = screen.getByRole('group');

    expect(item).toHaveClass('custom-class');
  });

  it('forwards additional props', () => {
    (useCarousel as jest.Mock).mockReturnValue({ orientation: 'horizontal' });

    render(<CarouselItem data-testid="carousel-item" />);
    expect(screen.getByTestId('carousel-item')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    (useCarousel as jest.Mock).mockReturnValue({ orientation: 'horizontal' });

    render(<CarouselItem />);
    const item = screen.getByRole('group');

    expect(item).toHaveAttribute('aria-roledescription', 'slide');
  });
});
