import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Button } from '../button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'danger'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'full', 'auto'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: '버튼',
    onClick: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      {(['default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'danger'] as const).map(
        (variant) => (
          <div key={variant} className='flex items-center gap-3'>
            <span className='w-24 text-sm text-gray-500'>{variant}</span>
            <Button variant={variant} size='sm'>Small</Button>
            <Button variant={variant}>Default</Button>
            <Button variant={variant} size='lg'>Large</Button>
          </div>
        )
      )}
    </div>
  ),
};

export const Loading: Story = {
  args: { loading: true, children: '로딩 중...' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ClickInteraction: Story = {
  args: { children: '클릭하세요' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const KeyboardInteraction: Story = {
  args: { children: 'Enter 키로 클릭' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
