import { fireEvent, render, screen } from '@testing-library/react';

import { Chip } from '../chip';

describe('Chip', () => {
  it('renders with children', () => {
    render(<Chip>태그</Chip>);
    expect(screen.getByRole('option')).toHaveTextContent('태그');
  });

  it('toggles on click', () => {
    const onClick = jest.fn();
    render(<Chip onClick={onClick}>클릭</Chip>);
    fireEvent.click(screen.getByRole('option'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('toggles on Enter key', () => {
    const onClick = jest.fn();
    render(<Chip onClick={onClick}>키보드</Chip>);
    const chip = screen.getByRole('option');
    fireEvent.keyDown(chip, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('toggles on Space key', () => {
    const onClick = jest.fn();
    render(<Chip onClick={onClick}>스페이스</Chip>);
    const chip = screen.getByRole('option');
    fireEvent.keyDown(chip, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('shows remove button when removable', () => {
    render(<Chip removable onRemove={() => {}}>삭제</Chip>);
    expect(screen.getByLabelText('삭제')).toBeInTheDocument();
  });

  it('calls onRemove when remove button clicked', () => {
    const onRemove = jest.fn();
    render(<Chip removable onRemove={onRemove}>삭제</Chip>);
    fireEvent.click(screen.getByLabelText('삭제'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('has aria-selected attribute', () => {
    render(<Chip selected>선택</Chip>);
    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');
  });

  it('applies selected styles', () => {
    render(<Chip variant='filled' selected>선택</Chip>);
    expect(screen.getByRole('option').className).toContain('bg-surface-secondary');
  });
});
