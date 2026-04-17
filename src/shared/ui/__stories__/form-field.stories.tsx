import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { FormField } from '../form-field';
import { Input } from '../input/Input';

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  argTypes: {
    error: { control: 'text' },
    required: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: (args) => (
    <FormField {...args}>
      <FormField.Label>이름</FormField.Label>
      <FormField.Control>
        <Input placeholder='이름을 입력하세요' />
      </FormField.Control>
      <FormField.Description>실명을 입력해주세요.</FormField.Description>
      <FormField.Error />
    </FormField>
  ),
};

export const Required: Story = {
  args: { required: true },
  render: (args) => (
    <FormField {...args}>
      <FormField.Label>이메일</FormField.Label>
      <FormField.Control>
        <Input type='email' placeholder='이메일을 입력하세요' />
      </FormField.Control>
      <FormField.Description>로그인에 사용됩니다.</FormField.Description>
      <FormField.Error />
    </FormField>
  ),
};

export const WithError: Story = {
  args: { error: '올바른 이메일 형식이 아닙니다.', required: true },
  render: (args) => (
    <FormField {...args}>
      <FormField.Label>이메일</FormField.Label>
      <FormField.Control>
        <Input variant='error' type='email' placeholder='이메일을 입력하세요' />
      </FormField.Control>
      <FormField.Error />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole('alert');
    await expect(alert).toHaveTextContent('올바른 이메일 형식이 아닙니다.');

    const input = canvas.getByPlaceholderText('이메일을 입력하세요');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAttribute('aria-describedby');
  },
};

export const CompleteForm: Story = {
  name: 'Complete Form Example',
  render: () => (
    <form className='flex flex-col gap-6'>
      <FormField required>
        <FormField.Label>이름</FormField.Label>
        <FormField.Control>
          <Input placeholder='이름을 입력하세요' />
        </FormField.Control>
      </FormField>

      <FormField required error='올바른 이메일 형식이 아닙니다.'>
        <FormField.Label>이메일</FormField.Label>
        <FormField.Control>
          <Input variant='error' type='email' placeholder='이메일을 입력하세요' />
        </FormField.Control>
        <FormField.Error />
      </FormField>

      <FormField>
        <FormField.Label>메모</FormField.Label>
        <FormField.Control>
          <Input placeholder='선택사항' />
        </FormField.Control>
        <FormField.Description>추가 메모를 남겨주세요.</FormField.Description>
      </FormField>
    </form>
  ),
};
