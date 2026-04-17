import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { DataList } from '../data-list';

const meta: Meta<typeof DataList> = {
  title: 'Components/DataList',
  component: DataList,
};
export default meta;

type Story = StoryObj<typeof DataList>;

export const Default: Story = {
  render: () => (
    <DataList>
      <DataList.Item>
        <DataList.Label>이름</DataList.Label>
        <DataList.Value>홍길동</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>이메일</DataList.Label>
        <DataList.Value>hong@example.com</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>회원 유형</DataList.Label>
        <DataList.Value>트레이너</DataList.Value>
      </DataList.Item>
    </DataList>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const terms = canvasElement.querySelectorAll('dt');
    const definitions = canvasElement.querySelectorAll('dd');
    await expect(terms.length).toBe(3);
    await expect(definitions.length).toBe(3);
    await expect(canvas.getByText('홍길동')).toBeInTheDocument();
  },
};

export const FitnessMetrics: Story = {
  name: 'Fitness Metrics Example',
  render: () => (
    <DataList className='rounded-lg bg-surface-background p-6'>
      <DataList.Item>
        <DataList.Label>남은 수업</DataList.Label>
        <DataList.Value>12회</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>이번 달 출석</DataList.Label>
        <DataList.Value>8회</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>등록일</DataList.Label>
        <DataList.Value>2026.03.01</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>만료일</DataList.Label>
        <DataList.Value className='text-text-token-danger'>2026.06.01</DataList.Value>
      </DataList.Item>
    </DataList>
  ),
};
