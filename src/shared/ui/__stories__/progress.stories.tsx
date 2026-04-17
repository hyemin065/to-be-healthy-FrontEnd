import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { Progress } from '../progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'warning'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  args: { value: 60 },
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progressbar = canvas.getByRole('progressbar');
    await expect(progressbar).toBeInTheDocument();
    await expect(progressbar).toHaveAttribute('aria-valuenow', '60');
    await expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    await expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      {(['default', 'success', 'warning'] as const).map((variant) => (
        <div key={variant} className='flex flex-col gap-2'>
          <span className='text-sm text-text-token-secondary'>{variant}</span>
          <Progress variant={variant} size='sm' value={30} />
          <Progress variant={variant} size='md' value={60} />
          <Progress variant={variant} size='lg' value={90} />
        </div>
      ))}
    </div>
  ),
};
