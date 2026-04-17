import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { Badge } from '../badge';

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>기본</Badge>);
    expect(screen.getByText('기본')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(<Badge variant='error'>에러</Badge>);
    expect(screen.getByText('에러').className).toContain('bg-status-error-bg');
  });

  it('applies size class', () => {
    render(<Badge size='sm'>작은</Badge>);
    expect(screen.getByText('작은').className).toContain('px-2');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>참조</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
