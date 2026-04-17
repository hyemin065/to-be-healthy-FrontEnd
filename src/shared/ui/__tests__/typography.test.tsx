import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { Typography } from '../typography';

describe('Typography', () => {
  it('renders with default element (p)', () => {
    render(<Typography>텍스트</Typography>);
    const el = screen.getByText('텍스트');
    expect(el.tagName).toBe('P');
  });

  it('renders heading1 as h1', () => {
    render(<Typography variant='heading1'>제목</Typography>);
    expect(screen.getByText('제목').tagName).toBe('H1');
  });

  it('renders title1 as h6', () => {
    render(<Typography variant='title1'>타이틀</Typography>);
    expect(screen.getByText('타이틀').tagName).toBe('H6');
  });

  it('uses "as" prop to override element', () => {
    render(<Typography variant='heading1' as='span'>스팬</Typography>);
    expect(screen.getByText('스팬').tagName).toBe('SPAN');
  });

  it('applies variant classes', () => {
    render(<Typography variant='body4Medium'>본문</Typography>);
    expect(screen.getByText('본문').className).toContain('font-medium');
  });

  it('applies color classes', () => {
    render(<Typography color='accent'>강조</Typography>);
    expect(screen.getByText('강조').className).toContain('text-text-token-accent');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLElement>();
    render(<Typography ref={ref}>참조</Typography>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });
});
