import { render, screen } from '@testing-library/react';

import { FormField } from '../form-field';
import { Input } from '../input/Input';

describe('FormField', () => {
  it('renders label with htmlFor linked to input id', () => {
    render(
      <FormField>
        <FormField.Label>이름</FormField.Label>
        <FormField.Control>
          <input />
        </FormField.Control>
      </FormField>
    );

    const label = screen.getByText('이름');
    const input = label.closest('div')?.parentElement?.querySelector('input');
    expect(label.tagName).toBe('LABEL');
    expect(input).toBeTruthy();
  });

  it('shows required asterisk when required', () => {
    render(
      <FormField required>
        <FormField.Label>이메일</FormField.Label>
        <FormField.Control>
          <input />
        </FormField.Control>
      </FormField>
    );

    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveAttribute('aria-hidden', 'true');
  });

  it('displays error message with role="alert"', () => {
    render(
      <FormField error='필수 입력입니다.'>
        <FormField.Label>이름</FormField.Label>
        <FormField.Control>
          <input />
        </FormField.Control>
        <FormField.Error />
      </FormField>
    );

    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('필수 입력입니다.');
  });

  it('does not render error when no error', () => {
    render(
      <FormField>
        <FormField.Label>이름</FormField.Label>
        <FormField.Control>
          <input />
        </FormField.Control>
        <FormField.Error />
      </FormField>
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('injects aria-invalid on control input when error exists', () => {
    render(
      <FormField error='에러'>
        <FormField.Label>이름</FormField.Label>
        <FormField.Control>
          <input data-testid='input' />
        </FormField.Control>
        <FormField.Error />
      </FormField>
    );

    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders description', () => {
    render(
      <FormField>
        <FormField.Label>이름</FormField.Label>
        <FormField.Control>
          <input />
        </FormField.Control>
        <FormField.Description>실명을 입력하세요.</FormField.Description>
      </FormField>
    );

    expect(screen.getByText('실명을 입력하세요.')).toBeInTheDocument();
  });

  it('links aria-describedby to description id', () => {
    render(
      <FormField>
        <FormField.Label>이름</FormField.Label>
        <FormField.Control>
          <input data-testid='input' />
        </FormField.Control>
        <FormField.Description>도움말 텍스트</FormField.Description>
      </FormField>
    );

    const input = screen.getByTestId('input');
    const description = screen.getByText('도움말 텍스트');
    expect(input).toHaveAttribute('aria-describedby', description.id);
  });

  it('links aria-describedby to error id when error exists', () => {
    render(
      <FormField error='에러 메시지'>
        <FormField.Label>이름</FormField.Label>
        <FormField.Control>
          <input data-testid='input' />
        </FormField.Control>
        <FormField.Error />
      </FormField>
    );

    const input = screen.getByTestId('input');
    const error = screen.getByRole('alert');
    expect(input).toHaveAttribute('aria-describedby', error.id);
  });

  it('integrates with Input component (error variant)', () => {
    render(
      <FormField error='올바른 이메일이 아닙니다.'>
        <FormField.Label>이메일</FormField.Label>
        <FormField.Control>
          <Input variant='error' placeholder='이메일' />
        </FormField.Control>
        <FormField.Error />
      </FormField>
    );

    const input = screen.getByPlaceholderText('이메일');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input.className).toContain('border-border-error');
    expect(screen.getByRole('alert')).toHaveTextContent('올바른 이메일이 아닙니다.');
  });
});
