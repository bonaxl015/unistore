import { render, screen } from '@testing-library/react';

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent
} from '@/components/ui/card';

describe('Given Card components', () => {
  it('renders Card with correct slot and classes', () => {
    render(<Card data-testid="card">Card Body</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveAttribute('data-slot', 'card');
    expect(card).toHaveTextContent('Card Body');
  });

  it('renders CardHeader with correct slot and classes', () => {
    render(<CardHeader data-testid="card-header">Header</CardHeader>);
    const header = screen.getByTestId('card-header');
    expect(header).toHaveAttribute('data-slot', 'card-header');
    expect(header).toHaveTextContent('Header');
    expect(header.className).toMatch(/grid/);
  });

  it('renders CardTitle with correct slot and classes', () => {
    render(<CardTitle data-testid="card-title">Title</CardTitle>);
    const title = screen.getByTestId('card-title');
    expect(title).toHaveAttribute('data-slot', 'card-title');
    expect(title).toHaveTextContent('Title');
    expect(title.className).toMatch(/font-semibold/);
  });

  it('renders CardDescription with correct slot and classes', () => {
    render(
      <CardDescription data-testid="card-description">
        Description
      </CardDescription>
    );
    const desc = screen.getByTestId('card-description');
    expect(desc).toHaveAttribute('data-slot', 'card-description');
    expect(desc).toHaveTextContent('Description');
    expect(desc.className).toMatch(/text-muted-foreground/);
  });

  it('renders CardAction with correct slot and classes', () => {
    render(<CardAction data-testid="card-action">Action</CardAction>);
    const action = screen.getByTestId('card-action');
    expect(action).toHaveAttribute('data-slot', 'card-action');
    expect(action).toHaveTextContent('Action');
    expect(action.className).toMatch(/justify-self-end/);
  });

  it('renders CardContent with correct slot and classes', () => {
    render(<CardContent data-testid="card-content">Content</CardContent>);
    const content = screen.getByTestId('card-content');
    expect(content).toHaveAttribute('data-slot', 'card-content');
    expect(content).toHaveTextContent('Content');
    expect(content.className).toMatch(/px-6/);
  });

  it('renders CardFooter with correct slot and classes', () => {
    render(<CardFooter data-testid="card-footer">Footer</CardFooter>);
    const footer = screen.getByTestId('card-footer');
    expect(footer).toHaveAttribute('data-slot', 'card-footer');
    expect(footer).toHaveTextContent('Footer');
    expect(footer.className).toMatch(/flex/);
  });

  it('merges custom className correctly', () => {
    render(<Card className="custom-class">Custom</Card>);
    const card = screen.getByText('Custom');
    expect(card.className).toMatch(/custom-class/);
  });
});
