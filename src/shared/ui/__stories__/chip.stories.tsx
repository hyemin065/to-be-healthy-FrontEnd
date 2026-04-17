import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import { Chip } from '../chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined'] },
    size: { control: 'select', options: ['sm', 'md'] },
    selected: { control: 'boolean' },
    removable: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: '운동 태그',
    onClick: fn(),
    onRemove: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      {(['filled', 'outlined'] as const).map((variant) => (
        <div key={variant} className='flex items-center gap-3'>
          <span className='w-20 text-sm text-gray-500'>{variant}</span>
          <Chip variant={variant}>기본</Chip>
          <Chip variant={variant} selected>선택됨</Chip>
          <Chip variant={variant} removable onRemove={() => {}}>삭제 가능</Chip>
        </div>
      ))}
    </div>
  ),
};

export const InteractiveSelection: Story = {
  render: function InteractiveChip() {
    const [selected, setSelected] = useState(false);
    return (
      <Chip
        variant='filled'
        selected={selected}
        onClick={() => setSelected(!selected)}>
        {selected ? '선택됨' : '선택하세요'}
      </Chip>
    );
  },
};

export const KeyboardToggle: Story = {
  args: { children: '키보드 토글' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole('option');
    await userEvent.tab();
    await expect(chip).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
