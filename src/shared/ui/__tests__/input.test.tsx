import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { Input } from '../input/Input';

describe('Input', () => {
  it('renders with default variant', () => {
    render(<Input placeholder='입력하세요' />);
    expect(screen.getByPlaceholderText('입력하세요')).toBeInTheDocument();
  });

  it('applies error variant class', () => {
    render(<Input variant='error' placeholder='에러' />);
    const input = screen.getByPlaceholderText('에러');
    expect(input.className).toContain('border-border-error');
  });

  it('applies ghost variant class', () => {
    render(<Input variant='ghost' placeholder='고스트' />);
    const input = screen.getByPlaceholderText('고스트');
    expect(input.className).toContain('bg-transparent');
  });

  it('applies sm size', () => {
    render(<Input inputSize='sm' placeholder='작은' />);
    const input = screen.getByPlaceholderText('작은');
    expect(input.className).toContain('h-9');
  });

  it('applies lg size', () => {
    render(<Input inputSize='lg' placeholder='큰' />);
    const input = screen.getByPlaceholderText('큰');
    expect(input.className).toContain('h-14');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled placeholder='비활성' />);
    expect(screen.getByPlaceholderText('비활성')).toBeDisabled();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder='참조' />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('defaults to text type', () => {
    render(<Input placeholder='기본' />);
    expect(screen.getByPlaceholderText('기본')).toHaveAttribute('type', 'text');
  });
});
