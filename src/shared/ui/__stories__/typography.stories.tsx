import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Typography } from '../typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'heading1', 'heading2', 'heading3', 'heading4', 'heading4Semibold', 'heading5',
        'title1', 'title1Semibold', 'title2', 'title3',
        'body1', 'body2', 'body3', 'body4', 'body4Medium',
      ],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'accent', 'danger', 'inverse'],
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'label'],
    },
    children: { control: 'text' },
  },
  args: { children: '건강해짐 Typography' },
};
export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      {([
        'heading1', 'heading2', 'heading3', 'heading4', 'heading4Semibold', 'heading5',
        'title1', 'title1Semibold', 'title2', 'title3',
        'body1', 'body2', 'body3', 'body4', 'body4Medium',
      ] as const).map((variant) => (
        <div key={variant} className='flex items-baseline gap-4 border-b border-gray-100 py-1'>
          <span className='w-36 text-xs text-gray-400'>{variant}</span>
          <Typography variant={variant}>건강해짐 Typography</Typography>
        </div>
      ))}
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-2'>
      {(['primary', 'secondary', 'tertiary', 'accent', 'danger'] as const).map((color) => (
        <Typography key={color} variant='title1' color={color}>
          {color}: 건강해짐 Typography
        </Typography>
      ))}
      <div className='bg-gray-800 p-2'>
        <Typography variant='title1' color='inverse'>
          inverse: 건강해짐 Typography
        </Typography>
      </div>
    </div>
  ),
};

export const PolymorphicAs: Story = {
  name: 'Polymorphic "as" Prop',
  render: () => (
    <div className='flex flex-col gap-2'>
      <Typography variant='heading1' as='h1'>h1 엘리먼트</Typography>
      <Typography variant='body1' as='span'>span 엘리먼트</Typography>
      <Typography variant='title1' as='label'>label 엘리먼트</Typography>
    </div>
  ),
};
