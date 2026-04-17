import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { FormField } from '../form-field';
import { Input } from '../input/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    variant: { control: 'select', options: ['default', 'error', 'ghost'] },
    inputSize: { control: 'select', options: ['sm', 'md', 'lg'] },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: '텍스트를 입력하세요',
    onChange: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('텍스트를 입력하세요');
    await userEvent.tab();
    await expect(input).toHaveFocus();
    await userEvent.type(input, '안녕하세요');
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      {(['default', 'error', 'ghost'] as const).map((variant) => (
        <div key={variant} className='flex flex-col gap-2'>
          <span className='text-sm text-text-token-secondary'>{variant}</span>
          <div className='flex gap-3'>
            <Input variant={variant} inputSize='sm' placeholder='Small' />
            <Input variant={variant} inputSize='md' placeholder='Medium' />
            <Input variant={variant} inputSize='lg' placeholder='Large' />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const WithFormField: Story = {
  render: () => (
    <FormField required error='필수 입력 항목입니다.'>
      <FormField.Label>이메일</FormField.Label>
      <FormField.Control>
        <Input variant='error' type='email' placeholder='이메일을 입력하세요' />
      </FormField.Control>
      <FormField.Error />
    </FormField>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: '비활성화된 입력' },
};
