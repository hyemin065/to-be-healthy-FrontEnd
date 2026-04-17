import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { Button } from '../button';

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button', { name: '클릭' })).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    render(<Button variant='secondary'>보조</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-surface-secondary');
  });

  it('handles click events', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>클릭</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>비활성</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when loading', () => {
    render(<Button loading>로딩</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows spinner when loading', () => {
    render(<Button loading>로딩</Button>);
    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>참조</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('responds to keyboard Enter', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>키보드</Button>);
    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyUp(button, { key: 'Enter' });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
