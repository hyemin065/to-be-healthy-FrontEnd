import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { Badge } from '../badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
    children: { control: 'text' },
  },
  args: { children: '배지' },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('배지')).toBeInTheDocument();
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      {(['default', 'success', 'warning', 'error', 'info'] as const).map((variant) => (
        <div key={variant} className='flex items-center gap-3'>
          <span className='w-20 text-sm text-text-token-secondary'>{variant}</span>
          <Badge variant={variant} size='sm'>Small</Badge>
          <Badge variant={variant} size='md'>Medium</Badge>
        </div>
      ))}
    </div>
  ),
};
