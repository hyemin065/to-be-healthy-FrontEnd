import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { Progress } from '../progress';

describe('Progress', () => {
  it('renders with progressbar role', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets aria-valuenow to value', () => {
    render(<Progress value={75} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '75');
  });

  it('sets aria-valuemin and aria-valuemax', () => {
    render(<Progress value={30} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  });

  it('applies default variant class', () => {
    render(<Progress value={50} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar.className).toContain('rounded-full');
  });

  it('applies success variant', () => {
    render(<Progress value={50} variant='success' />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar.className).toContain('bg-green-100');
  });

  it('applies sm size', () => {
    render(<Progress value={50} size='sm' />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar.className).toContain('h-[2px]');
  });

  it('applies lg size', () => {
    render(<Progress value={50} size='lg' />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar.className).toContain('h-[8px]');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('calculates translateX based on value', () => {
    render(<Progress value={60} />);
    const bar = screen.getByRole('progressbar').firstElementChild;
    expect(bar).toHaveStyle({ transform: 'translateX(-40%)' });
  });
});
